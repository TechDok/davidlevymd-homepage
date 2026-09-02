const COUNTRIES = [
  {
    id: "DZA",
    name: "Algeria",
    capital: "Algiers",
    largestCity: "Algiers",
    flag: "🇩🇿",
    facts: [
      "Algeria is the largest country in Africa by land area.",
      "The ancient city of Timgad preserves one of the clearest Roman street grids in North Africa.",
      "Rai music grew from western Algerian cities such as Oran before becoming internationally known."
    ]
  },
  {
    id: "AGO",
    name: "Angola",
    capital: "Luanda",
    largestCity: "Luanda",
    flag: "🇦🇴",
    facts: [
      "Luanda was founded by the Portuguese in 1576 and became a major Atlantic port.",
      "The Kalandula Falls are among the largest waterfalls in Africa by volume and width.",
      "Semba, an Angolan music and dance tradition, helped influence the development of Brazilian samba."
    ]
  },
  {
    id: "BEN",
    name: "Benin",
    capital: "Porto-Novo",
    largestCity: "Cotonou",
    flag: "🇧🇯",
    facts: [
      "Benin includes the historic heartland of the Kingdom of Dahomey.",
      "The Royal Palaces of Abomey are a UNESCO World Heritage Site.",
      "Vodun has deep roots in Benin and remains an important religious and cultural tradition."
    ]
  },
  {
    id: "BWA",
    name: "Botswana",
    capital: "Gaborone",
    largestCity: "Gaborone",
    flag: "🇧🇼",
    facts: [
      "The Okavango Delta is an inland delta where floodwaters spread into the Kalahari Desert.",
      "Botswana has one of the world's largest elephant populations.",
      "The Tsodilo Hills contain thousands of rock paintings and are sacred to local communities."
    ]
  },
  {
    id: "BFA",
    name: "Burkina Faso",
    capital: "Ouagadougou",
    largestCity: "Ouagadougou",
    flag: "🇧🇫",
    facts: [
      "Ouagadougou hosts FESPACO, one of Africa's most important film festivals.",
      "The name Burkina Faso is often translated as the land of upright people.",
      "Bronze casting, mask traditions, and textile work are major parts of the country's artistic life."
    ]
  },
  {
    id: "BDI",
    name: "Burundi",
    capital: "Gitega",
    largestCity: "Bujumbura",
    flag: "🇧🇮",
    facts: [
      "Burundi moved its political capital from Bujumbura to Gitega in 2019.",
      "Royal drum ensembles are one of Burundi's best-known cultural traditions.",
      "Lake Tanganyika forms much of Burundi's western border and is one of the world's deepest lakes."
    ]
  },
  {
    id: "CPV",
    name: "Cabo Verde",
    capital: "Praia",
    largestCity: "Praia",
    flag: "🇨🇻",
    facts: [
      "Cabo Verde is an Atlantic island nation made up of volcanic islands.",
      "Morna music, associated with Cesaria Evora, is one of the country's signature sounds.",
      "The islands became a major crossroads for Atlantic navigation and Creole culture."
    ]
  },
  {
    id: "CMR",
    name: "Cameroon",
    capital: "Yaounde",
    largestCity: "Douala",
    flag: "🇨🇲",
    facts: [
      "Cameroon is often called Africa in miniature because of its varied landscapes and cultures.",
      "Mount Cameroon is an active volcano and one of West Africa's highest peaks.",
      "Makossa and bikutsi are influential music styles with roots in Cameroon."
    ]
  },
  {
    id: "CAF",
    name: "Central African Republic",
    capital: "Bangui",
    largestCity: "Bangui",
    flag: "🇨🇫",
    facts: [
      "The Dzanga-Sangha reserve is known for forest elephants and western lowland gorillas.",
      "The country sits near the geographic center of the African continent.",
      "Sangho is widely used as a national language alongside French."
    ]
  },
  {
    id: "TCD",
    name: "Chad",
    capital: "N'Djamena",
    largestCity: "N'Djamena",
    flag: "🇹🇩",
    facts: [
      "Lake Chad has supported fishing, farming, and trade for many communities across the region.",
      "The Ennedi Plateau is famous for sandstone arches, rock art, and desert landscapes.",
      "Chad's north reaches deep into the Sahara, while its south has savanna and farming zones."
    ]
  },
  {
    id: "COM",
    name: "Comoros",
    capital: "Moroni",
    largestCity: "Moroni",
    flag: "🇰🇲",
    facts: [
      "Comoros lies in the Mozambique Channel between Madagascar and mainland Africa.",
      "Mount Karthala on Grande Comore is one of the world's largest active volcanoes.",
      "Comorian culture blends African, Arab, Malagasy, and French influences."
    ]
  },
  {
    id: "COG",
    name: "Republic of the Congo",
    capital: "Brazzaville",
    largestCity: "Brazzaville",
    flag: "🇨🇬",
    facts: [
      "Brazzaville and Kinshasa face each other across the Congo River.",
      "The Congo Basin rainforest is one of Earth's largest tropical forest systems.",
      "Sapeur fashion culture is especially associated with Brazzaville and Kinshasa."
    ]
  },
  {
    id: "COD",
    name: "Democratic Republic of the Congo",
    capital: "Kinshasa",
    largestCity: "Kinshasa",
    flag: "🇨🇩",
    facts: [
      "The Congo River is one of the world's great rivers by discharge.",
      "Congolese rumba has had a huge influence on popular music across Africa.",
      "Virunga National Park, founded in 1925, is Africa's oldest national park."
    ]
  },
  {
    id: "CIV",
    name: "Cote d'Ivoire",
    capital: "Yamoussoukro",
    largestCity: "Abidjan",
    flag: "🇨🇮",
    facts: [
      "Abidjan is one of West Africa's major commercial and cultural centers.",
      "The Basilica of Our Lady of Peace in Yamoussoukro is one of the world's largest church buildings.",
      "Cote d'Ivoire is one of the world's leading cocoa producers."
    ]
  },
  {
    id: "DJI",
    name: "Djibouti",
    capital: "Djibouti",
    largestCity: "Djibouti",
    flag: "🇩🇯",
    facts: [
      "Djibouti sits near the Bab el-Mandeb, a strategic gateway between the Red Sea and the Gulf of Aden.",
      "Lake Assal is one of the lowest points in Africa and is extremely salty.",
      "Afar and Somali cultures are central to the country's identity."
    ]
  },
  {
    id: "EGY",
    name: "Egypt",
    capital: "Cairo",
    largestCity: "Cairo",
    flag: "🇪🇬",
    facts: [
      "The Nile Valley has supported Egyptian civilization for thousands of years.",
      "The Great Pyramid of Giza is the only surviving wonder of the ancient world.",
      "Cairo's historic Islamic architecture includes mosques, gates, and markets from many eras."
    ]
  },
  {
    id: "GNQ",
    name: "Equatorial Guinea",
    capital: "Malabo",
    largestCity: "Bata",
    flag: "🇬🇶",
    facts: [
      "Equatorial Guinea is the only African country where Spanish is an official national language.",
      "Malabo is on Bioko Island, while Bata is on the mainland coast.",
      "Bioko's rainforests are important habitat for primates and nesting sea turtles."
    ]
  },
  {
    id: "ERI",
    name: "Eritrea",
    capital: "Asmara",
    largestCity: "Asmara",
    flag: "🇪🇷",
    facts: [
      "Asmara is known for its preserved modernist architecture from the early 20th century.",
      "Eritrea has a long Red Sea coastline and the Dahlak Archipelago.",
      "The ancient port of Adulis connected the region to Red Sea and Indian Ocean trade."
    ]
  },
  {
    id: "SWZ",
    name: "Eswatini",
    capital: "Mbabane and Lobamba",
    largestCity: "Manzini",
    flag: "🇸🇿",
    facts: [
      "Eswatini changed its English name from Swaziland in 2018.",
      "The country has two capitals: Mbabane is administrative, while Lobamba is royal and legislative.",
      "The Umhlanga reed dance is one of Eswatini's major cultural ceremonies."
    ]
  },
  {
    id: "ETH",
    name: "Ethiopia",
    capital: "Addis Ababa",
    largestCity: "Addis Ababa",
    flag: "🇪🇹",
    facts: [
      "Ethiopia uses its own calendar system, which is about seven to eight years behind the Gregorian calendar.",
      "Lalibela's rock-hewn churches are carved directly from volcanic stone.",
      "Coffee is widely linked to Ethiopia's highlands and remains central to social life."
    ]
  },
  {
    id: "GAB",
    name: "Gabon",
    capital: "Libreville",
    largestCity: "Libreville",
    flag: "🇬🇦",
    facts: [
      "Large parts of Gabon are covered by rainforest.",
      "Loango National Park is famous for wildlife near beaches, lagoons, and forests.",
      "The Fang people are known for influential mask and reliquary arts."
    ]
  },
  {
    id: "GMB",
    name: "The Gambia",
    capital: "Banjul",
    largestCity: "Serekunda",
    flag: "🇬🇲",
    facts: [
      "The Gambia follows both sides of the Gambia River and is mainland Africa's smallest country.",
      "Kunta Kinteh Island is linked to Atlantic slave trade history and memory.",
      "Kora music and griot storytelling are important parts of Mandinka cultural heritage."
    ]
  },
  {
    id: "GHA",
    name: "Ghana",
    capital: "Accra",
    largestCity: "Accra",
    flag: "🇬🇭",
    facts: [
      "Ghana became the first sub-Saharan African colony to gain independence in 1957.",
      "The Asante kingdom was famous for gold, statecraft, and kente cloth.",
      "Cape Coast and Elmina castles are powerful sites for understanding Atlantic history."
    ]
  },
  {
    id: "GIN",
    name: "Guinea",
    capital: "Conakry",
    largestCity: "Conakry",
    flag: "🇬🇳",
    facts: [
      "The Fouta Djallon highlands are a source area for major West African rivers.",
      "Guinea is rich in bauxite, a key ore for aluminum.",
      "Mande music traditions and the balafon have deep roots in the region."
    ]
  },
  {
    id: "GNB",
    name: "Guinea-Bissau",
    capital: "Bissau",
    largestCity: "Bissau",
    flag: "🇬🇼",
    facts: [
      "The Bijagos Archipelago is known for biodiversity and distinctive island cultures.",
      "Creole language and music are central to urban life in Bissau.",
      "Guinea-Bissau's liberation struggle was led by the PAIGC under Amilcar Cabral."
    ]
  },
  {
    id: "KEN",
    name: "Kenya",
    capital: "Nairobi",
    largestCity: "Nairobi",
    flag: "🇰🇪",
    facts: [
      "Nairobi is one of the few world capitals with a national park on its edge.",
      "Kenya's Rift Valley landscapes include lakes, escarpments, and major fossil sites.",
      "Swahili culture along the coast reflects centuries of Indian Ocean trade."
    ]
  },
  {
    id: "LSO",
    name: "Lesotho",
    capital: "Maseru",
    largestCity: "Maseru",
    flag: "🇱🇸",
    facts: [
      "Lesotho is entirely surrounded by South Africa.",
      "It is the only independent country whose entire territory lies above 1,000 meters in elevation.",
      "Basotho blankets and the mokorotlo hat are strong national symbols."
    ]
  },
  {
    id: "LBR",
    name: "Liberia",
    capital: "Monrovia",
    largestCity: "Monrovia",
    flag: "🇱🇷",
    facts: [
      "Liberia declared independence in 1847, making it Africa's oldest modern republic.",
      "Monrovia is named after U.S. President James Monroe.",
      "Sapo National Park protects one of West Africa's largest remaining rainforest areas."
    ]
  },
  {
    id: "LBY",
    name: "Libya",
    capital: "Tripoli",
    largestCity: "Tripoli",
    flag: "🇱🇾",
    facts: [
      "Leptis Magna is one of the best-preserved Roman city sites in the Mediterranean world.",
      "The Sahara covers most of Libya's land area.",
      "Tripoli's old city reflects Mediterranean, Ottoman, and North African influences."
    ]
  },
  {
    id: "MDG",
    name: "Madagascar",
    capital: "Antananarivo",
    largestCity: "Antananarivo",
    flag: "🇲🇬",
    facts: [
      "Madagascar split from other landmasses long ago, helping create its famous endemic wildlife.",
      "Lemurs are found naturally only in Madagascar and nearby Comoros.",
      "The Avenue of the Baobabs is one of the country's most recognizable landscapes."
    ]
  },
  {
    id: "MWI",
    name: "Malawi",
    capital: "Lilongwe",
    largestCity: "Lilongwe",
    flag: "🇲🇼",
    facts: [
      "Lake Malawi is famous for its extraordinary diversity of cichlid fish.",
      "The lake is sometimes called the Lake of Stars because of lights reflected from fishing boats.",
      "Malawi has rich traditions of wood carving, dance, and choral music."
    ]
  },
  {
    id: "MLI",
    name: "Mali",
    capital: "Bamako",
    largestCity: "Bamako",
    flag: "🇲🇱",
    facts: [
      "Timbuktu was a major center of scholarship and manuscript culture.",
      "The Mali Empire under Mansa Musa became famous for wealth, trade, and pilgrimage.",
      "The Great Mosque of Djenne is one of the world's most celebrated earthen buildings."
    ]
  },
  {
    id: "MRT",
    name: "Mauritania",
    capital: "Nouakchott",
    largestCity: "Nouakchott",
    flag: "🇲🇷",
    facts: [
      "Mauritania links the Maghreb and West Africa across the Sahara and Sahel.",
      "Chinguetti was a historic center of learning and trans-Saharan trade.",
      "The Banc d'Arguin is one of the world's most important sites for migratory birds."
    ]
  },
  {
    id: "MUS",
    name: "Mauritius",
    capital: "Port Louis",
    largestCity: "Port Louis",
    flag: "🇲🇺",
    facts: [
      "Mauritius is associated with the dodo, an extinct bird that lived only on the island.",
      "The country has no official language, but English, French, and Mauritian Creole are widely used.",
      "Aapravasi Ghat records the history of indentured labor in the Indian Ocean world."
    ]
  },
  {
    id: "MAR",
    name: "Morocco",
    capital: "Rabat",
    largestCity: "Casablanca",
    flag: "🇲🇦",
    facts: [
      "Morocco's old cities include Fez, Marrakesh, Rabat, and Meknes.",
      "The Atlas Mountains divide Atlantic, Mediterranean, and Saharan landscapes.",
      "Amazigh languages and culture are central to Morocco's identity."
    ]
  },
  {
    id: "MOZ",
    name: "Mozambique",
    capital: "Maputo",
    largestCity: "Maputo",
    flag: "🇲🇿",
    facts: [
      "Mozambique has a long Indian Ocean coastline facing major trade routes.",
      "The Island of Mozambique was once the capital of Portuguese East Africa.",
      "Marrabenta is a popular music style strongly associated with Maputo."
    ]
  },
  {
    id: "NAM",
    name: "Namibia",
    capital: "Windhoek",
    largestCity: "Windhoek",
    flag: "🇳🇦",
    facts: [
      "The Namib Desert is one of the oldest deserts on Earth.",
      "Etosha National Park is centered on a vast salt pan visible from space.",
      "Namibia's coast includes the foggy Skeleton Coast, known for shipwrecks and desert wildlife."
    ]
  },
  {
    id: "NER",
    name: "Niger",
    capital: "Niamey",
    largestCity: "Niamey",
    flag: "🇳🇪",
    facts: [
      "Niger is named after the Niger River, which flows through the southwest of the country.",
      "Agadez was a historic gateway for trans-Saharan caravans.",
      "The Air Mountains and Tenere Desert contain dramatic Saharan landscapes."
    ]
  },
  {
    id: "NGA",
    name: "Nigeria",
    capital: "Abuja",
    largestCity: "Lagos",
    flag: "🇳🇬",
    facts: [
      "Nigeria is Africa's most populous country.",
      "Nollywood is one of the world's largest film industries by output.",
      "The Benin Bronzes show the sophistication of historic metalworking in the region."
    ]
  },
  {
    id: "RWA",
    name: "Rwanda",
    capital: "Kigali",
    largestCity: "Kigali",
    flag: "🇷🇼",
    facts: [
      "Rwanda is known as the land of a thousand hills.",
      "Volcanoes National Park protects mountain gorillas in the Virunga range.",
      "Umuganda is a national community work tradition held monthly."
    ]
  },
  {
    id: "STP",
    name: "Sao Tome and Principe",
    capital: "Sao Tome",
    largestCity: "Sao Tome",
    flag: "🇸🇹",
    facts: [
      "Sao Tome and Principe is an island nation in the Gulf of Guinea.",
      "The islands became important cocoa producers, once nicknamed chocolate islands.",
      "Obo National Park protects rainforests, volcanic peaks, and endemic birds."
    ]
  },
  {
    id: "SEN",
    name: "Senegal",
    capital: "Dakar",
    largestCity: "Dakar",
    flag: "🇸🇳",
    facts: [
      "Dakar is the westernmost major city on the African mainland.",
      "Goree Island is a powerful memorial site connected to Atlantic slave trade history.",
      "Mbalax music, associated with artists such as Youssou N'Dour, grew from Senegalese rhythms."
    ]
  },
  {
    id: "SYC",
    name: "Seychelles",
    capital: "Victoria",
    largestCity: "Victoria",
    flag: "🇸🇨",
    facts: [
      "Seychelles is an Indian Ocean archipelago with granitic and coral islands.",
      "The coco de mer palm produces the world's largest seed.",
      "Creole culture blends African, European, and Asian influences."
    ]
  },
  {
    id: "SLE",
    name: "Sierra Leone",
    capital: "Freetown",
    largestCity: "Freetown",
    flag: "🇸🇱",
    facts: [
      "Freetown was founded as a settlement for formerly enslaved people.",
      "Bunce Island is an important site for understanding Atlantic slave trade history.",
      "The country's name comes from Portuguese words meaning lion mountains."
    ]
  },
  {
    id: "SOM",
    name: "Somalia",
    capital: "Mogadishu",
    largestCity: "Mogadishu",
    flag: "🇸🇴",
    facts: [
      "Somalia has the longest coastline on mainland Africa.",
      "Historic Somali ports were connected to trade across the Red Sea and Indian Ocean.",
      "Poetry is a deeply valued art form in Somali culture."
    ]
  },
  {
    id: "ZAF",
    name: "South Africa",
    capital: "Pretoria, Cape Town, and Bloemfontein",
    largestCity: "Johannesburg",
    flag: "🇿🇦",
    facts: [
      "South Africa has three capital cities serving executive, legislative, and judicial roles.",
      "The Cradle of Humankind contains important early human fossil sites.",
      "Eleven official languages were recognized for decades, with South African Sign Language later added."
    ]
  },
  {
    id: "SSD",
    name: "South Sudan",
    capital: "Juba",
    largestCity: "Juba",
    flag: "🇸🇸",
    facts: [
      "South Sudan became independent in 2011, making it one of the world's newest countries.",
      "The Sudd is one of the largest wetlands in the world.",
      "Many communities in South Sudan have strong cattle-herding traditions and distinctive oral poetry."
    ]
  },
  {
    id: "SDN",
    name: "Sudan",
    capital: "Khartoum",
    largestCity: "Omdurman",
    flag: "🇸🇩",
    facts: [
      "Sudan has more ancient pyramids than Egypt, many associated with the Kingdom of Kush.",
      "Khartoum sits near the meeting of the Blue Nile and White Nile.",
      "Meroe was a powerful ancient city and ironworking center."
    ]
  },
  {
    id: "TZA",
    name: "Tanzania",
    capital: "Dodoma",
    largestCity: "Dar es Salaam",
    flag: "🇹🇿",
    facts: [
      "Mount Kilimanjaro is Africa's highest mountain.",
      "Zanzibar was a major Indian Ocean trading hub and has a richly layered Swahili culture.",
      "Olduvai Gorge is famous for discoveries linked to early human evolution."
    ]
  },
  {
    id: "TGO",
    name: "Togo",
    capital: "Lome",
    largestCity: "Lome",
    flag: "🇹🇬",
    facts: [
      "Lome is one of the few African capitals located directly on an international border.",
      "Koutammakou, the land of the Batammariba, is known for distinctive tower houses.",
      "Togo's cultures include Ewe, Kabye, Mina, and many other communities."
    ]
  },
  {
    id: "TUN",
    name: "Tunisia",
    capital: "Tunis",
    largestCity: "Tunis",
    flag: "🇹🇳",
    facts: [
      "Ancient Carthage, near modern Tunis, was one of Rome's great rivals.",
      "Tunisia contains Mediterranean coast, olive groves, mountains, and Sahara landscapes.",
      "The medina of Tunis preserves centuries of urban architecture and craft traditions."
    ]
  },
  {
    id: "UGA",
    name: "Uganda",
    capital: "Kampala",
    largestCity: "Kampala",
    flag: "🇺🇬",
    facts: [
      "Lake Victoria touches Uganda and is Africa's largest lake by area.",
      "The source region of the Nile has long been associated with Jinja.",
      "The crested crane on Uganda's flag is a national symbol."
    ]
  },
  {
    id: "ZMB",
    name: "Zambia",
    capital: "Lusaka",
    largestCity: "Lusaka",
    flag: "🇿🇲",
    facts: [
      "Victoria Falls, shared with Zimbabwe, is known locally as Mosi-oa-Tunya, the smoke that thunders.",
      "Zambia is one of Africa's major copper-producing countries.",
      "South Luangwa National Park is famous for walking safaris."
    ]
  },
  {
    id: "ZWE",
    name: "Zimbabwe",
    capital: "Harare",
    largestCity: "Harare",
    flag: "🇿🇼",
    facts: [
      "Great Zimbabwe was a major medieval stone city and trading center.",
      "The country's name comes from dzimba dzemabwe, often translated as houses of stone.",
      "Zimbabwe shares Victoria Falls with Zambia on the Zambezi River."
    ]
  }
];
