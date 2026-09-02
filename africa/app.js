const QUIZ_TYPES = [
  { key: "location", label: "Location" },
  { key: "name", label: "Name" },
  { key: "capital", label: "Capital" },
  { key: "largestCity", label: "Largest city" },
  { key: "flag", label: "Flag" }
];

const MAP_SIZE = { width: 860, height: 780 };
const MAX_ZOOM = 8;
const DRAG_THRESHOLD = 8;
const MARKER_COUNTRIES = new Set(["CPV", "COM", "DJI", "GMB", "GNB", "LSO", "MUS", "RWA", "SYC", "STP", "SWZ"]);

const map = document.querySelector("#africaMap");
const mapLayer = document.querySelector("#mapLayer");
const markerLayer = document.querySelector("#markerLayer");
const choicesEl = document.querySelector("#choices");
const questionText = document.querySelector("#questionText");
const subText = document.querySelector("#subText");
const quizTypeEl = document.querySelector("#quizType");
const feedback = document.querySelector("#feedback");
const feedbackBadge = document.querySelector("#feedbackBadge");
const feedbackTitle = document.querySelector("#feedbackTitle");
const factsList = document.querySelector("#factsList");
const nextButton = document.querySelector("#nextButton");
const resetButton = document.querySelector("#resetButton");
const progressBar = document.querySelector("#progressBar");
const questionStat = document.querySelector("#questionStat");
const countryStat = document.querySelector("#countryStat");
const scoreStat = document.querySelector("#scoreStat");
const quizModeButton = document.querySelector("#quizModeButton");
const teachModeButton = document.querySelector("#teachModeButton");
const quizSetup = document.querySelector("#quizSetup");
const questionCountInput = document.querySelector("#questionCount");
const startQuizButton = document.querySelector("#startQuizButton");
const teachPanel = document.querySelector("#teachPanel");
const countrySelect = document.querySelector("#countrySelect");
const resetMapButton = document.querySelector("#resetMapButton");
const zoomInButton = document.querySelector("#zoomInButton");
const zoomOutButton = document.querySelector("#zoomOutButton");
const questionBlock = document.querySelector(".question-block");
const statsGrid = document.querySelector(".stats-grid");
const meter = document.querySelector(".meter");
const actions = document.querySelector(".actions");

let mode = "quiz";
let questionDeck = [];
let questionIndex = 0;
let score = 0;
let answered = false;
let completed = false;
let currentWrongId = null;
let selectedTeachingId = "DZA";
let projection;
let mapViewBox = { x: 0, y: 0, width: MAP_SIZE.width, height: MAP_SIZE.height };
let dragState = null;
let suppressMapClick = false;

function init() {
  projection = createProjection();
  selectedTeachingId = sortedCountries()[0].id;
  populateCountrySelect();
  renderMap();
  setupMapInteractions();
  startQuiz();
  switchMode("quiz");
}

function sortedCountries() {
  return [...COUNTRIES].sort((a, b) => a.name.localeCompare(b.name));
}

function shuffle(items) {
  const copy = [...items];
  for (let index = copy.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [copy[index], copy[swapIndex]] = [copy[swapIndex], copy[index]];
  }
  return copy;
}

function createProjection() {
  const points = [];
  Object.values(COUNTRY_GEOMETRY).forEach((geometry) => collectPoints(geometry.coordinates, points));

  const longitudes = points.map((point) => point[0]);
  const latitudes = points.map((point) => point[1]);
  const bounds = {
    minLon: Math.min(...longitudes),
    maxLon: Math.max(...longitudes),
    minLat: Math.min(...latitudes),
    maxLat: Math.max(...latitudes)
  };

  const padding = 28;
  const lonSpan = bounds.maxLon - bounds.minLon;
  const latSpan = bounds.maxLat - bounds.minLat;
  const scale = Math.min(
    (MAP_SIZE.width - padding * 2) / lonSpan,
    (MAP_SIZE.height - padding * 2) / latSpan
  );
  const drawnWidth = lonSpan * scale;
  const drawnHeight = latSpan * scale;
  const offsetX = (MAP_SIZE.width - drawnWidth) / 2;
  const offsetY = (MAP_SIZE.height - drawnHeight) / 2;

  return ([lon, lat]) => [
    offsetX + (lon - bounds.minLon) * scale,
    offsetY + (bounds.maxLat - lat) * scale
  ];
}

function collectPoints(value, points) {
  if (typeof value?.[0] === "number") {
    points.push(value);
    return;
  }
  value.forEach((item) => collectPoints(item, points));
}

function populateCountrySelect() {
  countrySelect.innerHTML = "";
  sortedCountries().forEach((country) => {
    const option = document.createElement("option");
    option.value = country.id;
    option.textContent = country.name;
    countrySelect.append(option);
  });
  countrySelect.value = selectedTeachingId;
}

function renderMap() {
  mapLayer.innerHTML = "";
  markerLayer.innerHTML = "";

  COUNTRIES.forEach((country) => {
    const geometry = COUNTRY_GEOMETRY[country.id];
    const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
    path.setAttribute("d", geometryToPath(geometry));
    path.setAttribute("class", "country");
    path.setAttribute("data-id", country.id);
    path.setAttribute("tabindex", "0");
    path.setAttribute("role", "button");
    path.setAttribute("aria-label", country.name);
    path.addEventListener("click", () => handleMapPick(country.id));
    path.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        handleMapPick(country.id, true);
      }
    });
    mapLayer.append(path);

    if (MARKER_COUNTRIES.has(country.id)) {
      const [cx, cy] = projection(geometry.label);
      const marker = document.createElementNS("http://www.w3.org/2000/svg", "circle");
      marker.setAttribute("class", "locator");
      marker.setAttribute("data-id", country.id);
      marker.setAttribute("cx", cx.toFixed(2));
      marker.setAttribute("cy", cy.toFixed(2));
      marker.setAttribute("r", country.id === "SYC" || country.id === "MUS" ? 7.5 : 6);
      marker.setAttribute("tabindex", "0");
      marker.setAttribute("role", "button");
      marker.setAttribute("aria-label", country.name);
      marker.addEventListener("click", () => handleMapPick(country.id));
      marker.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
          event.preventDefault();
          handleMapPick(country.id, true);
        }
      });
      markerLayer.append(marker);
    }
  });
  applyMapViewBox();
}

function geometryToPath(geometry) {
  const polygons = geometry.type === "Polygon" ? [geometry.coordinates] : geometry.coordinates;
  return polygons
    .map((polygon) => polygon.map((ring) => ringToPath(ring)).join(" "))
    .join(" ");
}

function ringToPath(ring) {
  return ring
    .map((point, index) => {
      const [x, y] = projection(point);
      return `${index === 0 ? "M" : "L"}${x.toFixed(2)} ${y.toFixed(2)}`;
    })
    .join(" ") + " Z";
}

function setupMapInteractions() {
  zoomInButton.addEventListener("click", () => zoomMap(0.72));
  zoomOutButton.addEventListener("click", () => zoomMap(1.28));
  resetMapButton.addEventListener("click", resetMapView);

  map.addEventListener("wheel", (event) => {
    event.preventDefault();
    zoomMap(event.deltaY < 0 ? 0.82 : 1.18, screenToMapPoint(event.clientX, event.clientY));
  }, { passive: false });

  map.addEventListener("pointerdown", (event) => {
    if (event.button !== 0) return;
    dragState = {
      startX: event.clientX,
      startY: event.clientY,
      viewBox: { ...mapViewBox },
      moved: false
    };
    map.classList.add("dragging");
    map.setPointerCapture(event.pointerId);
  });

  map.addEventListener("pointermove", (event) => {
    if (!dragState) return;
    const bounds = map.getBoundingClientRect();
    const dx = event.clientX - dragState.startX;
    const dy = event.clientY - dragState.startY;
    if (Math.abs(dx) + Math.abs(dy) > DRAG_THRESHOLD) {
      dragState.moved = true;
      suppressMapClick = true;
    }
    mapViewBox.x = dragState.viewBox.x - (dx / bounds.width) * dragState.viewBox.width;
    mapViewBox.y = dragState.viewBox.y - (dy / bounds.height) * dragState.viewBox.height;
    clampViewBox();
    applyMapViewBox();
  });

  map.addEventListener("pointerup", (event) => finishDrag(event));
  map.addEventListener("pointercancel", (event) => finishDrag(event));
}

function finishDrag(event) {
  if (!dragState) return;
  const wasMoved = dragState.moved;
  const selectedCountryId = wasMoved ? null : countryIdAtPoint(event.clientX, event.clientY);

  try {
    map.releasePointerCapture(event.pointerId);
  } catch {
    // Pointer capture may already be released by the browser.
  }
  map.classList.remove("dragging");

  if (selectedCountryId) {
    handleMapPick(selectedCountryId, true);
    suppressMapClick = true;
  }

  if (wasMoved || selectedCountryId) {
    window.setTimeout(() => {
      suppressMapClick = false;
    }, 120);
  }
  dragState = null;
}

function countryIdAtPoint(clientX, clientY) {
  const element = document.elementFromPoint(clientX, clientY);
  return element?.closest?.(".country, .locator")?.dataset.id ?? null;
}

function screenToMapPoint(clientX, clientY) {
  const bounds = map.getBoundingClientRect();
  return {
    x: mapViewBox.x + ((clientX - bounds.left) / bounds.width) * mapViewBox.width,
    y: mapViewBox.y + ((clientY - bounds.top) / bounds.height) * mapViewBox.height
  };
}

function zoomMap(multiplier, center = centerOfViewBox()) {
  const minWidth = MAP_SIZE.width / MAX_ZOOM;
  const minHeight = MAP_SIZE.height / MAX_ZOOM;
  const nextWidth = Math.min(MAP_SIZE.width, Math.max(minWidth, mapViewBox.width * multiplier));
  const nextHeight = Math.min(MAP_SIZE.height, Math.max(minHeight, mapViewBox.height * multiplier));
  const xRatio = (center.x - mapViewBox.x) / mapViewBox.width;
  const yRatio = (center.y - mapViewBox.y) / mapViewBox.height;

  mapViewBox.x = center.x - nextWidth * xRatio;
  mapViewBox.y = center.y - nextHeight * yRatio;
  mapViewBox.width = nextWidth;
  mapViewBox.height = nextHeight;
  clampViewBox();
  applyMapViewBox();
}

function centerOfViewBox() {
  return {
    x: mapViewBox.x + mapViewBox.width / 2,
    y: mapViewBox.y + mapViewBox.height / 2
  };
}

function resetMapView() {
  mapViewBox = { x: 0, y: 0, width: MAP_SIZE.width, height: MAP_SIZE.height };
  applyMapViewBox();
}

function clampViewBox() {
  if (mapViewBox.width >= MAP_SIZE.width) {
    mapViewBox.x = 0;
    mapViewBox.width = MAP_SIZE.width;
  } else {
    mapViewBox.x = Math.min(Math.max(0, mapViewBox.x), MAP_SIZE.width - mapViewBox.width);
  }

  if (mapViewBox.height >= MAP_SIZE.height) {
    mapViewBox.y = 0;
    mapViewBox.height = MAP_SIZE.height;
  } else {
    mapViewBox.y = Math.min(Math.max(0, mapViewBox.y), MAP_SIZE.height - mapViewBox.height);
  }
}

function applyMapViewBox() {
  map.setAttribute(
    "viewBox",
    `${mapViewBox.x.toFixed(2)} ${mapViewBox.y.toFixed(2)} ${mapViewBox.width.toFixed(2)} ${mapViewBox.height.toFixed(2)}`
  );
}

function startQuiz() {
  const count = clampQuestionCount(Number(questionCountInput.value));
  questionCountInput.value = count;
  questionDeck = buildQuestionDeck(count);
  questionIndex = 0;
  score = 0;
  answered = false;
  completed = false;
  currentWrongId = null;
  renderQuestion();
}

function clampQuestionCount(value) {
  if (!Number.isFinite(value)) return 30;
  return Math.min(COUNTRIES.length * QUIZ_TYPES.length, Math.max(5, Math.round(value)));
}

function buildQuestionDeck(count) {
  const allQuestions = COUNTRIES.flatMap((country) => (
    QUIZ_TYPES.map((type) => ({ country, type }))
  ));
  return shuffle(allQuestions).slice(0, count);
}

function currentQuestion() {
  return questionDeck[questionIndex];
}

function renderQuestion() {
  if (questionIndex >= questionDeck.length) {
    renderCompletion();
    return;
  }

  answered = false;
  currentWrongId = null;
  const { country, type } = currentQuestion();
  const questionNumber = questionIndex + 1;
  const totalQuestions = questionDeck.length;

  questionStat.textContent = `${questionNumber} / ${totalQuestions}`;
  countryStat.textContent = `${countSeenCountries(questionIndex + 1)} / ${COUNTRIES.length}`;
  scoreStat.textContent = `${score} / ${questionNumber - 1}`;
  progressBar.style.width = `${((questionNumber - 1) / totalQuestions) * 100}%`;
  quizTypeEl.textContent = type.label;
  feedback.classList.add("hidden");
  feedbackBadge.className = "";
  choicesEl.innerHTML = "";
  nextButton.disabled = true;
  nextButton.textContent = "Next";

  if (type.key === "location") {
    questionText.textContent = `Find ${country.name}`;
    subText.textContent = "Select the country on the map.";
  } else if (type.key === "name") {
    questionText.textContent = "Which country is highlighted?";
    subText.textContent = "Choose the correct country name.";
    renderChoices(country, "name");
  } else if (type.key === "capital") {
    questionText.textContent = `What is the capital of ${country.name}?`;
    subText.textContent = "Choose the capital city.";
    renderChoices(country, "capital");
  } else if (type.key === "largestCity") {
    questionText.textContent = `What is the largest city in ${country.name}?`;
    subText.textContent = "Choose the largest city by population.";
    renderChoices(country, "largestCity");
  } else {
    questionText.textContent = `Which flag belongs to ${country.name}?`;
    subText.textContent = "Choose the official national flag.";
    renderChoices(country, "flag");
  }

  updateMapState();
}

function countSeenCountries(limit) {
  return new Set(questionDeck.slice(0, limit).map((question) => question.country.id)).size;
}

function renderChoices(country, field) {
  const choices = buildChoices(country, field);
  choices.forEach((choice) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = field === "flag" ? "choice-button flag-choice" : "choice-button";
    button.dataset.value = choice.value;
    button.dataset.correct = String(choice.correct);
    button.setAttribute("aria-label", choice.aria);
    if (field === "flag") {
      const image = document.createElement("img");
      image.src = choice.image;
      image.alt = "";
      image.loading = "lazy";
      const label = document.createElement("span");
      label.className = "sr-only";
      label.textContent = choice.aria;
      button.append(image, label);
    } else {
      button.textContent = choice.text;
    }
    button.addEventListener("click", () => handleChoice(button, choice));
    choicesEl.append(button);
  });
}

function buildChoices(country, field) {
  if (field === "flag") {
    const distractors = shuffle(COUNTRIES.filter((item) => item.id !== country.id)).slice(0, 3);
    return shuffle([country, ...distractors]).map((item) => ({
      text: item.flag,
      image: flagSource(item),
      value: item.id,
      aria: `${item.name} flag`,
      correct: item.id === country.id
    }));
  }

  const answer = country[field];
  const pool = [];
  const seen = new Set([answer]);
  shuffle(COUNTRIES).forEach((item) => {
    const value = item[field];
    if (!seen.has(value)) {
      seen.add(value);
      pool.push(value);
    }
  });

  return shuffle([answer, ...pool.slice(0, 3)]).map((value) => ({
    text: value,
    value,
    aria: value,
    correct: value === answer
  }));
}

function flagSource(country) {
  return `assets/flags/${COUNTRY_GEOMETRY[country.id].iso2}.svg`;
}

function handleChoice(button, choice) {
  if (answered || mode !== "quiz") return;
  const { country } = currentQuestion();
  const isCorrect = choice.correct;
  answered = true;
  if (isCorrect) score += 1;

  [...choicesEl.querySelectorAll(".choice-button")].forEach((item) => {
    item.disabled = true;
    if (item.dataset.correct === "true") item.classList.add("correct");
  });
  if (!isCorrect) button.classList.add("wrong");

  showFeedback(isCorrect, answerLabel(country));
  updateMapState();
}

function handleMapPick(countryId, force = false) {
  if (suppressMapClick && !force) return;

  if (mode === "teach") {
    selectTeachingCountry(countryId);
    return;
  }

  if (completed || answered || currentQuestion()?.type.key !== "location") return;
  const { country } = currentQuestion();
  const isCorrect = countryId === country.id;
  answered = true;
  currentWrongId = isCorrect ? null : countryId;
  if (isCorrect) score += 1;
  showFeedback(isCorrect, country.name);
  updateMapState();
}

function showFeedback(isCorrect, correctAnswer) {
  const { country } = currentQuestion();
  const questionNumber = questionIndex + 1;

  scoreStat.textContent = `${score} / ${questionNumber}`;
  countryStat.textContent = `${countSeenCountries(questionNumber)} / ${COUNTRIES.length}`;
  feedback.classList.remove("hidden");
  feedbackBadge.textContent = isCorrect ? "Correct" : "Review";
  feedbackBadge.className = isCorrect ? "right" : "wrong";
  feedbackTitle.textContent = isCorrect ? correctAnswer : `Answer: ${correctAnswer}`;
  factsList.innerHTML = country.facts.map((fact) => `<li>${fact}</li>`).join("");
  nextButton.disabled = false;
  progressBar.style.width = `${(questionNumber / questionDeck.length) * 100}%`;
}

function answerLabel(country) {
  const quiz = currentQuestion().type.key;
  if (quiz === "name" || quiz === "location") return country.name;
  if (quiz === "capital") return country.capital;
  if (quiz === "largestCity") return country.largestCity;
  return country.name;
}

function updateMapState() {
  const activeQuestion = currentQuestion();
  const targetId = mode === "teach" ? selectedTeachingId : activeQuestion?.country.id;
  const quiz = activeQuestion?.type.key;
  const shouldHighlightQuiz = mode === "quiz" && (quiz === "name" || answered);

  document.querySelectorAll(".country, .locator").forEach((node) => {
    const id = node.dataset.id;
    node.classList.remove("dim", "target", "correct", "wrong", "teaching");

    if (!targetId) return;

    if (mode === "teach") {
      if (id !== targetId) node.classList.add("dim");
      if (id === targetId) node.classList.add("teaching");
      return;
    }

    if (shouldHighlightQuiz && id !== targetId && id !== currentWrongId) node.classList.add("dim");
    if (shouldHighlightQuiz && id === targetId) node.classList.add(answered ? "correct" : "target");
    if (answered && id === currentWrongId) node.classList.add("wrong");
  });
}

function advance() {
  if (completed) {
    startQuiz();
    return;
  }

  if (!answered) return;
  questionIndex += 1;
  renderQuestion();
}

function renderCompletion() {
  completed = true;
  const totalQuestions = questionDeck.length;
  const percent = Math.round((score / totalQuestions) * 100);

  choicesEl.innerHTML = "";
  feedback.classList.add("hidden");
  questionText.innerHTML = `<span class="completion"><strong>${percent}%</strong><span>Quiz complete.</span></span>`;
  subText.textContent = `${score} correct out of ${totalQuestions} questions.`;
  quizTypeEl.textContent = "Complete";
  questionStat.textContent = `${totalQuestions} / ${totalQuestions}`;
  countryStat.textContent = `${countSeenCountries(totalQuestions)} / ${COUNTRIES.length}`;
  scoreStat.textContent = `${score} / ${totalQuestions}`;
  progressBar.style.width = "100%";
  nextButton.disabled = false;
  nextButton.textContent = "Restart";
  document.querySelectorAll(".country, .locator").forEach((node) => {
    node.classList.remove("dim", "target", "wrong", "teaching");
    node.classList.add("correct");
  });
}

function switchMode(nextMode) {
  mode = nextMode;
  const isQuiz = mode === "quiz";

  quizModeButton.classList.toggle("active", isQuiz);
  teachModeButton.classList.toggle("active", !isQuiz);
  quizModeButton.setAttribute("aria-selected", String(isQuiz));
  teachModeButton.setAttribute("aria-selected", String(!isQuiz));

  quizSetup.classList.toggle("hidden", !isQuiz);
  meter.classList.toggle("hidden", !isQuiz);
  statsGrid.classList.toggle("hidden", !isQuiz);
  questionBlock.classList.toggle("hidden", !isQuiz);
  choicesEl.classList.toggle("hidden", !isQuiz);
  feedback.classList.toggle("hidden", !isQuiz || !answered);
  actions.classList.toggle("hidden", !isQuiz);
  teachPanel.classList.toggle("hidden", isQuiz);

  if (isQuiz) {
    renderQuestion();
  } else {
    renderTeachingCountry();
  }
  updateMapState();
}

function selectTeachingCountry(countryId) {
  selectedTeachingId = countryId;
  countrySelect.value = countryId;
  renderTeachingCountry();
  updateMapState();
}

function renderTeachingCountry() {
  const country = COUNTRIES.find((item) => item.id === selectedTeachingId);
  const countryCard = document.querySelector("#countryCard");
  countryCard.innerHTML = "";

  const header = document.createElement("div");
  header.className = "country-card-header";

  const flag = document.createElement("img");
  flag.src = flagSource(country);
  flag.alt = `${country.name} flag`;

  const titleBlock = document.createElement("div");
  const title = document.createElement("h2");
  title.textContent = country.name;
  const subtitle = document.createElement("p");
  subtitle.className = "subtext";
  subtitle.textContent = `Official flag, capital, largest city, and three cultural or historical notes.`;
  titleBlock.append(title, subtitle);
  header.append(flag, titleBlock);

  const dataGrid = document.createElement("div");
  dataGrid.className = "data-grid";
  dataGrid.append(
    dataCell("Capital", country.capital),
    dataCell("Largest city", country.largestCity),
    dataCell("Map code", country.id),
    dataCell("Quiz topics", "Location, name, capital, largest city, flag")
  );

  const factList = document.createElement("ul");
  factList.id = "teachFactsList";
  country.facts.forEach((fact) => {
    const item = document.createElement("li");
    item.textContent = fact;
    factList.append(item);
  });

  countryCard.append(header, dataGrid, factList);
}

function dataCell(label, value) {
  const cell = document.createElement("div");
  const labelEl = document.createElement("span");
  labelEl.textContent = label;
  const valueEl = document.createElement("strong");
  valueEl.textContent = value;
  cell.append(labelEl, valueEl);
  return cell;
}

nextButton.addEventListener("click", advance);
resetButton.addEventListener("click", () => {
  if (mode === "quiz") {
    startQuiz();
  } else {
    selectTeachingCountry(sortedCountries()[0].id);
  }
});
startQuizButton.addEventListener("click", startQuiz);
questionCountInput.addEventListener("change", () => {
  questionCountInput.value = clampQuestionCount(Number(questionCountInput.value));
});
quizModeButton.addEventListener("click", () => switchMode("quiz"));
teachModeButton.addEventListener("click", () => switchMode("teach"));
countrySelect.addEventListener("change", () => selectTeachingCountry(countrySelect.value));

init();
