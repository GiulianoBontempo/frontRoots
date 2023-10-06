import React, { useState, useRef, useCallback, useEffect } from 'react';
import { forceSimulation, forceManyBody, forceLink, forceCenter } from 'd3-force';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import ReactFlow, {
  ReactFlowProvider,
  addEdge,
  useNodesState,
  useEdgesState,
  Controls,
  Background,
  BackgroundVariant,
} from 'reactflow';
import 'reactflow/dist/style.css';
import Button from './button';
import './index.css';
import { IconButton } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import { nodesPath } from './sidebar';
import BasicModal from './modal';
import DeleteAllModal from './DeleteAllModal'

// Definição dos nós iniciais
const initialNodes = [

];

const nouns = ["accelerator", "accordion", "account", "accountant", "acknowledgment", "acoustic", "acrylic", "act", "action", "active", "activity", "actor", "actress", "adapter", "addition", "address", "adjustment", "adult", "advantage", "advertisement", "advice", "afghanistan", "africa", "aftermath", "afternoon", "aftershave", "afterthought", "age", "agenda", "agreement", "air", "airbus", "airmail", "airplane", "airport", "airship", "alarm", "albatross", "alcohol", "algebra", "algeria", "alibi", "alley", "alligator", "alloy", "almanac", "alphabet", "alto", "aluminium", "aluminum", "ambulance", "america", "amount", "amusement", "anatomy", "anethesiologist", "anger", "angle", "angora", "animal", "anime", "ankle", "answer", "ant", "antarctica", "anteater", "antelope", "anthony", "anthropology", "apartment", "apology", "apparatus", "apparel", "appeal", "appendix", "apple", "appliance", "approval", "april", "aquarius", "arch", "archaeology", "archeology", "archer", "architecture", "area", "argentina", "argument", "aries", "arithmetic", "arm", "armadillo", "armchair", "armenian", "army", "arrow", "art", "ash", "ashtray", "asia", "asparagus", "asphalt", "asterisk", "astronomy", "athlete", "atm", "atom", "attack", "attempt", "attention", "attic", "attraction", "august", "aunt", "australia", "australian", "author", "authorisation", "authority", "authorization", "avenue", "babies", "baboon", "baby", "back", "backbone", "bacon", "badge", "badger", "bag", "bagel", "bagpipe", "bail", "bait", "baker", "bakery", "balance", "balinese", "ball", "balloon", "bamboo", "banana", "band", "bandana", "bangladesh", "bangle", "banjo", "bank", "bankbook", "banker", "bar", "barbara", "barber", "barge", "baritone", "barometer", "base", "baseball", "basement", "basin", "basket", "basketball", "bass", "bassoon", "bat", "bath", "bathroom", "bathtub", "battery", "battle", "bay", "beach", "bead", "beam", "bean", "bear", "beard", "beast", "beat", "beautician", "beauty", "beaver", "bed", "bedroom", "bee", "beech", "beef", "beer", "beet", "beetle", "beggar", "beginner", "begonia", "behavior", "belgian", "belief", "believe", "bell", "belt", "bench", "bengal", "beret", "berry", "bestseller", "betty", "bibliography", "bicycle", "bike", "bill", "billboard", "biology", "biplane", "birch", "bird", "birth", "birthday", "bit", "bite", "black", "bladder", "blade", "blanket", "blinker", "blizzard", "block", "blood", "blouse", "blow", "blowgun", "blue", "board", "boat", "bobcat", "body", "bolt", "bomb", "bomber", "bone", "bongo", "bonsai", "book", "bookcase", "booklet", "boot", "border", "botany", "bottle", "bottom", "boundary", "bow", "bowl", "bowling", "box", "boy", "bra", "brace", "bracket", "brain", "brake", "branch", "brand", "brandy", "brass", "brazil", "bread", "break", "breakfast", "breath", "brian", "brick", "bridge", "british", "broccoli", "brochure", "broker", "bronze", "brother", "brother-in-law", "brow", "brown", "brush", "bubble", "bucket", "budget", "buffer", "buffet", "bugle", "building", "bulb", "bull", "bulldozer", "bumper", "bun", "burglar", "burma", "burn", "burst", "bus", "bush", "business", "butane", "butcher", "butter", "button", "buzzard", "c-clamp", "cabbage", "cabinet", "cable", "cactus", "cafe", "cake", "calculator", "calculus", "calendar", "calf", "call", "camel", "camera", "camp", "can", "canada", "canadian", "cancer", "candle", "cannon", "canoe", "canvas", "cap", "capital", "cappelletti", "capricorn", "captain", "caption", "car", "caravan", "carbon", "card", "cardboard", "cardigan", "care", "carnation", "carol", "carp", "carpenter", "carriage", "carrot", "cart", "cartoon", "case", "cast", "castanet", "cat", "catamaran", "caterpillar", "cathedral", "catsup", "cattle", "cauliflower", "cause", "caution", "cave", "cd", "ceiling", "celery", "celeste", "cell", "cellar", "cello", "celsius", "cement", "cemetery", "cent", "centimeter", "century", "ceramic", "cereal", "certification", "chain", "chair", "chalk", "chance", "change", "channel", "character", "chard", "charles", "chauffeur", "check", "cheek", "cheese", "cheetah", "chef", "chemistry", "cheque", "cherries", "cherry", "chess", "chest", "chick", "chicken", "chicory", "chief", "child", "children", "chill", "chime", "chimpanzee", "chin", "china", "chinese", "chive", "chocolate", "chord", "christmas", "christopher", "chronometer", "church", "cicada", "cinema", "circle", "circulation", "cirrus", "citizenship", "city", "clam", "clarinet", "class", "claus", "clave", "clef", "clerk", "click", "client", "climb", "clipper", "cloakroom", "clock", "close", "closet", "cloth", "cloud", "cloudy", "clover", "club", "clutch", "coach", "coal", "coast", "coat", "cobweb", "cockroach", "cocktail", "cocoa", "cod", "coffee", "coil", "coin", "coke", "cold", "collar", "college", "collision", "colombia", "colon", "colony", "color", "colt", "column", "columnist", "comb", "comfort", "comic", "comma", "command", "commission", "committee", "community", "company", "comparison", "competition", "competitor", "composer", "composition", "computer", "condition", "condor", "cone", "confirmation", "conga", "congo", "conifer", "connection", "consonant", "continent", "control", "cook", "cooking", "copper", "copy", "copyright", "cord", "cork", "cormorant", "corn", "cornet", "correspondent", "cost", "cotton", "couch", "cougar", "cough", "country", "course", "court", "cousin", "cover", "cow", "cowbell", "crab", "crack", "cracker", "craftsman", "crate", "crawdad", "crayfish", "crayon", "cream", "creator", "creature", "credit", "creditor", "creek", "crib", "cricket", "crime", "criminal", "crocodile", "crocus", "croissant", "crook", "crop", "cross", "crow", "crowd", "crown", "crush", "cry", "cub", "cuban", "cucumber", "cultivator", "cup", "cupboard", "cupcake", "curler", "currency", "current", "curtain", "curve", "cushion", "custard", "customer", "cut", "cuticle", "cycle", "cyclone", "cylinder", "cymbal", "dad", "daffodil", "dahlia", "daisy", "damage", "dance", "dancer", "danger", "daniel", "dash", "dashboard", "database", "date", "daughter", "david", "day", "dead", "deadline", "deal", "death", "deborah", "debt", "debtor", "decade", "december", "decimal", "decision", "decrease", "dedication", "deer", "defense", "deficit", "degree", "delete", "delivery", "den", "denim", "dentist", "deodorant", "department", "deposit", "description", "desert", "design", "desire", "desk", "dessert", "destruction", "detail", "detective", "development", "dew", "diamond", "diaphragm", "dibble", "dictionary", "dietician", "difference", "digestion", "digger", "digital", "dill", "dime", "dimple", "dinghy", "dinner", "dinosaur", "diploma", "dipstick", "direction", "dirt", "disadvantage", "discovery", "discussion", "disease", "disgust", "dish", "distance", "distribution", "distributor", "diving", "division", "divorced", "dock", "doctor", "dog", "dogsled", "doll", "dollar", "dolphin", "domain", "donald", "donkey", "donna", "door", "dorothy", "double", "doubt", "downtown", "dragon", "dragonfly", "drain", "drake", "drama", "draw", "drawbridge", "drawer", "dream", "dredger", "dress", "dresser", "dressing", "drill", "drink", "drive", "driver", "driving", "drizzle", "drop", "drug", "drum", "dry", "dryer", "duck", "duckling", "dugout", "dungeon", "dust", "eagle", "ear", "earth", "earthquake", "ease", "east", "edge", "edger", "editor", "editorial", "education", "edward", "eel", "effect", "egg", "eggnog", "eggplant", "egypt", "eight", "elbow", "element", "elephant", "elizabeth", "ellipse", "emery", "employee", "employer", "encyclopedia", "end", "enemy", "energy", "engine", "engineer", "engineering", "english", "enquiry", "entrance", "environment", "epoch", "epoxy", "equinox", "equipment", "era", "error", "estimate", "ethernet", "ethiopia", "euphonium", "europe", "evening", "event", "ex-husband", "ex-wife", "examination", "example", "exchange", "exclamation", "exhaust", "existence", "expansion", "experience", "expert", "explanation", "eye", "eyebrow", "eyelash", "eyeliner", "face", "facilities", "fact", "factory", "fahrenheit", "fairies", "fall", "family", "fan", "fang", "farm", "farmer", "fat", "father", "father-in-law", "faucet", "fear", "feast", "feather", "feature", "february", "fedelini", "feedback", "feeling", "feet", "felony", "female", "fender", "ferry", "ferryboat", "fertilizer", "fiber", "fiberglass", "fibre", "fiction", "field", "fifth", "fight", "fighter", "file", "find", "fine", "finger", "fir", "fire", "fired", "fireman", "fireplace", "firewall", "fish", "fisherman", "flag", "flame", "flare", "flat", "flavor", "flax", "flesh", "flight", "flock", "flood", "floor", "flower", "flugelhorn", "flute", "fly", "foam", "fog", "fold", "font", "food", "foot", "football", "footnote", "force", "forecast", "forehead", "forest", "forgery", "fork", "form", "format", "fortnight", "foundation", "fountain", "fowl", "fox", "foxglove", "fragrance", "frame", "france", "freckle", "freeze", "freezer", "freighter", "french", "freon", "friction", "friday", "fridge", "friend", "frog", "front", "frost", "frown", "fruit", "fuel", "fur", "furniture", "galley", "gallon", "game", "gander", "garage", "garden", "garlic", "gas", "gasoline", "gate", "gateway", "gauge", "gazelle", "gear", "gearshift", "geese", "gemini", "gender", "geography", "geology", "geometry", "george", "geranium", "german", "germany", "ghana", "ghost", "giant", "giraffe", "girdle", "girl", "gladiolus", "glass", "glider", "gliding", "glockenspiel", "glove", "glue", "goal", "goat", "gold", "goldfish", "golf", "gondola", "gong", "good-bye", "goose", "gore-tex", "gorilla", "gosling", "government", "governor", "grade", "grain", "gram", "granddaughter", "grandfather", "grandmother", "grandson", "grape", "graphic", "grass", "grasshopper", "gray", "grease", "great-grandfather", "great-grandmother", "greece", "greek", "green", "grenade", "grey", "grill", "grip", "ground", "group", "grouse", "growth", "guarantee", "guatemalan", "guide", "guilty", "guitar", "gum", "gun", "gym", "gymnast", "hacksaw", "hail", "hair", "haircut", "half-brother", "half-sister", "halibut", "hall", "hallway", "hamburger", "hammer", "hamster", "hand", "handball", "handicap", "handle", "handsaw", "harbor", "hardboard", "hardcover", "hardhat", "hardware", "harmonica", "harmony", "harp", "hat", "hate", "hawk", "head", "headlight", "headline", "health", "hearing", "heart", "heat", "heaven", "hedge", "height", "helen", "helicopter", "helium", "hell", "helmet", "help", "hemp", "hen", "heron", "herring", "hexagon", "hill", "himalayan", "hip", "hippopotamus", "history", "hobbies", "hockey", "hoe", "hole", "holiday", "home", "honey", "hood", "hook", "hope", "horn", "horse", "hose", "hospital", "hot", "hour", "hourglass", "house", "hovercraft", "hub", "hubcap", "humidity", "humor", "hurricane", "hyacinth", "hydrant", "hydrofoil", "hydrogen", "hyena", "hygienic", "ice", "icebreaker", "icicle", "icon", "idea", "ikebana", "illegal", "imprisonment", "improvement", "impulse", "inch", "income", "increase", "index", "india", "indonesia", "industry", "ink", "innocent", "input", "insect", "instruction", "instrument", "insulation", "insurance", "interactive", "interest", "internet", "interviewer", "intestine", "invention", "inventory", "invoice", "iran", "iraq", "iris", "iron", "island", "israel", "italian", "italy", "jacket", "jaguar", "jail", "jam", "james", "january", "japan", "japanese", "jar", "jasmine", "jason", "jaw", "jeans", "jeep", "jeff", "jelly", "jellyfish", "jennifer", "jet", "jewel", "jogging", "john", "join", "joke", "joseph", "journey", "judge", "judo", "juice", "july", "jumbo", "jump", "jumper", "june", "jury", "justice", "jute", "kale", "kamikaze", "kangaroo", "karate", "karen", "kayak", "kendo", "kenneth", "kenya", "ketchup", "kettle", "kettledrum", "kevin", "key", "keyboard", "keyboarding", "kick", "kidney", "kilogram", "kilometer", "kimberly", "kiss", "kitchen", "kite", "kitten", "kitty", "knee", "knickers", "knife", "knight", "knot", "knowledge", "kohlrabi", "korean", "laborer", "lace", "ladybug", "lake", "lamb", "lamp", "lan", "land", "landmine", "language", "larch", "lasagna", "latency", "latex", "lathe", "laugh", "laundry", "laura", "law", "lawyer", "layer", "lead", "leaf", "learning", "leather", "leek", "leg", "legal", "lemonade", "lentil", "leo", "leopard", "letter", "lettuce", "level", "libra", "library", "license", "lier", "lift", "light", "lightning", "lilac", "lily", "limit", "linda", "line", "linen", "link", "lion", "lip", "lipstick", "liquid", "liquor", "lisa", "list", "literature", "litter", "liver", "lizard", "llama", "loaf", "loan", "lobster", "lock", "locket", "locust", "look", "loss", "lotion", "love", "low", "lumber", "lunch", "lunchroom", "lung", "lunge", "lute", "luttuce", "lycra", "lynx", "lyocell", "lyre", "lyric", "macaroni", "machine", "macrame", "magazine", "magic", "magician", "maid", "mail", "mailbox", "mailman", "makeup", "malaysia", "male", "mall", "mallet", "man", "manager", "mandolin", "manicure", "manx", "map", "maple", "maraca", "marble", "march", "margaret", "margin", "maria", "marimba", "mark", "market", "married", "mary", "mascara", "mask", "mass", "match", "math", "mattock", "may", "mayonnaise", "meal", "measure", "meat", "mechanic", "medicine", "meeting", "melody", "memory", "men", "menu", "mercury", "message", "metal", "meteorology", "meter", "methane", "mexican", "mexico", "mice", "michael", "michelle", "microwave", "middle", "mile", "milk", "milkshake", "millennium", "millimeter", "millisecond", "mimosa", "mind", "mine", "mini-skirt", "minibus", "minister", "mint", "minute", "mirror", "missile", "mist", "mistake", "mitten", "moat", "modem", "mole", "mom", "monday", "money", "monkey", "month", "moon", "morning", "morocco", "mosque", "mosquito", "mother", "mother-in-law", "motion", "motorboat", "motorcycle", "mountain", "mouse", "moustache", "mouth", "move", "multi-hop", "multimedia", "muscle", "museum", "music", "musician", "mustard", "myanmar", "nail", "name", "nancy", "napkin", "narcissus", "nation", "neck", "need", "needle", "neon", "nepal", "nephew", "nerve", "nest", "net", "network", "news", "newsprint", "newsstand", "nic", "nickel", "niece", "nigeria", "night", "nitrogen", "node", "noise", "noodle", "north", "north america", "north korea", "norwegian", "nose", "note", "notebook", "notify", "novel", "november", "number", "numeric", "nurse", "nut", "nylon", "oak", "oatmeal", "objective", "oboe", "observation", "occupation", "ocean", "ocelot", "octagon", "octave", "october", "octopus", "odometer", "offence", "offer", "office", "oil", "okra", "olive", "onion", "open", "opera", "operation", "ophthalmologist", "opinion", "option", "orange", "orchestra", "orchid", "order", "organ", "organisation", "organization", "ornament", "ostrich", "otter", "ounce", "output", "outrigger", "oval", "oven", "overcoat", "owl", "owner", "ox", "oxygen", "oyster", "package", "packet", "page", "pail", "pain", "paint", "pair", "pajama", "pakistan", "palm", "pamphlet", "pan", "pancake", "pancreas", "panda", "pansy", "panther", "panties", "pantry", "pants", "panty", "pantyhose", "paper", "paperback", "parade", "parallelogram", "parcel", "parent", "parentheses", "park", "parrot", "parsnip", "part", "particle", "partner", "partridge", "party", "passbook", "passenger", "passive", "pasta", "paste", "pastor", "pastry", "patch", "path", "patient", "patio", "patricia", "paul", "payment", "pea", "peace", "peak", "peanut", "pear", "pedestrian", "pediatrician", "peen", "peer-to-peer", "pelican", "pen", "penalty", "pencil", "pendulum", "pentagon", "peony", "pepper", "perch", "perfume", "period", "periodical", "peripheral", "permission", "persian", "person", "peru", "pest", "pet", "pharmacist", "pheasant", "philippines", "philosophy", "phone", "physician", "piano", "piccolo", "pickle", "picture", "pie", "pig", "pigeon", "pike", "pillow", "pilot", "pimple", "pin", "pine", "ping", "pink", "pint", "pipe", "pisces", "pizza", "place", "plain", "plane", "planet", "plant", "plantation", "plaster", "plasterboard", "plastic", "plate", "platinum", "play", "playground", "playroom", "pleasure", "plier", "plot", "plough", "plow", "plywood", "pocket", "poet", "point", "poison", "poland", "police", "policeman", "polish", "politician", "pollution", "polo", "polyester", "pond", "popcorn", "poppy", "population", "porch", "porcupine", "port", "porter", "position", "possibility", "postage", "postbox", "pot", "potato", "poultry", "pound", "powder", "power", "precipitation", "preface", "prepared", "pressure", "price", "priest", "print", "printer", "prison", "probation", "process", "processing", "produce", "product", "production", "professor", "profit", "promotion", "propane", "property", "prose", "prosecution", "protest", "protocol", "pruner", "psychiatrist", "psychology", "ptarmigan", "puffin", "pull", "puma", "pump", "pumpkin", "punch", "punishment", "puppy", "purchase", "purple", "purpose", "push", "pvc", "pyjama", "pyramid", "quail", "quality", "quart", "quarter", "quartz", "queen", "question", "quicksand", "quiet", "quill", "quilt", "quince", "quit", "quiver", "quotation", "rabbi", "rabbit", "racing", "radar", "radiator", "radio", "radish", "raft", "rail", "railway", "rain", "rainbow", "raincoat", "rainstorm", "rake", "ramie", "random", "range", "rat", "rate", "raven", "ravioli", "ray", "rayon", "reaction", "reading", "reason", "receipt", "recess", "record", "recorder", "rectangle", "red", "reduction", "refrigerator", "refund", "regret", "reindeer", "relation", "relative", "religion", "relish", "reminder", "repair", "replace", "report", "representative", "request", "resolution", "respect", "responsibility", "rest", "restaurant", "result", "retailer", "revolve", "revolver", "reward", "rhinoceros", "rhythm", "rice", "richard", "riddle", "rifle", "ring", "rise", "risk", "river", "riverbed", "road", "roadway", "roast", "robert", "robin", "rock", "rocket", "rod", "roll", "romania", "romanian", "ronald", "roof", "room", "rooster", "root", "rose", "rotate", "route", "router", "rowboat", "rub", "rubber", "rugby", "rule", "run", "russia", "russian", "rutabaga", "ruth", "sack", "sagittarius", "sail", "sailboat", "sailor", "salad", "salary", "sale", "salesman", "salmon", "salt", "sampan", "samurai", "sand", "sandra", "sandwich", "santa", "sarah", "sardine", "satin", "saturday", "sauce", "saudi arabia", "sausage", "save", "saw", "saxophone", "scale", "scallion", "scanner", "scarecrow", "scarf", "scene", "scent", "schedule", "school", "science", "scissors", "scooter", "scorpio", "scorpion", "scraper", "screen", "screw", "screwdriver", "sea", "seagull", "seal", "seaplane", "search", "seashore", "season", "seat", "second", "secretary", "secure", "security", "seed", "seeder", "segment", "select", "selection", "self", "semicircle", "semicolon", "sense", "sentence", "separated", "september", "servant", "server", "session", "sex", "shade", "shadow", "shake", "shallot", "shame", "shampoo", "shape", "share", "shark", "sharon", "shears", "sheep", "sheet", "shelf", "shell", "shield", "shingle", "ship", "shirt", "shock", "shoe", "shoemaker", "shop", "shorts", "shoulder", "shovel", "show", "shrimp", "shrine", "siamese", "siberian", "side", "sideboard", "sidecar", "sidewalk", "sign", "signature", "silica", "silk", "silver", "sing", "singer", "single", "sink", "sister", "sister-in-law", "size", "skate", "skiing", "skill", "skin", "skirt", "sky", "slash", "slave", "sled", "sleep", "sleet", "slice", "slime", "slip", "slipper", "slope", "smash", "smell", "smile", "smoke", "snail", "snake", "sneeze", "snow", "snowboarding", "snowflake", "snowman", "snowplow", "snowstorm", "soap", "soccer", "society", "sociology", "sock", "soda", "sofa", "softball", "softdrink", "software", "soil", "soldier", "son", "song", "soprano", "sort", "sound", "soup", "sousaphone", "south africa", "south america", "south korea", "soy", "soybean", "space", "spade", "spaghetti", "spain", "spandex", "spark", "sparrow", "spear", "specialist", "speedboat", "sphere", "sphynx", "spider", "spike", "spinach", "spleen", "sponge", "spoon", "spot", "spring", "sprout", "spruce", "spy", "square", "squash", "squid", "squirrel", "stage", "staircase", "stamp", "star", "start", "starter", "state", "statement", "station", "statistic", "steam", "steel", "stem", "step", "step-aunt", "step-brother", "step-daughter", "step-father", "step-grandfather", "step-grandmother", "step-mother", "step-sister", "step-son", "step-uncle", "stepdaughter", "stepmother", "stepson", "steven", "stew", "stick", "stinger", "stitch", "stock", "stocking", "stomach", "stone", "stool", "stop", "stopsign", "stopwatch", "store", "storm", "story", "stove", "stranger", "straw", "stream", "street", "streetcar", "stretch", "string", "structure", "study", "sturgeon", "submarine", "substance", "subway", "success", "sudan", "suede", "sugar", "suggestion", "suit", "summer", "sun", "sunday", "sundial", "sunflower", "sunshine", "supermarket", "supply", "support", "surfboard", "surgeon", "surname", "surprise", "susan", "sushi", "swallow", "swamp", "swan", "sweater", "sweatshirt", "sweatshop", "swedish", "sweets", "swim", "swimming", "swing", "swiss", "switch", "sword", "swordfish", "sycamore", "syria", "syrup", "system", "t-shirt", "table", "tablecloth", "tabletop", "tachometer", "tadpole", "tail", "tailor", "taiwan", "talk", "tank", "tanker", "tanzania", "target", "taste", "taurus", "tax", "taxi", "taxicab", "tea", "teacher", "teaching", "team", "technician", "teeth", "television", "teller", "temper", "temperature", "temple", "tempo", "tendency", "tennis", "tenor", "tent", "territory", "test", "text", "textbook", "texture", "thailand", "theater", "theory", "thermometer", "thing", "thistle", "thomas", "thought", "thread", "thrill", "throat", "throne", "thumb", "thunder", "thunderstorm", "thursday", "ticket", "tie", "tiger", "tights", "tile", "timbale", "time", "timer", "timpani", "tin", "tip", "tire", "titanium", "title", "toad", "toast", "toe", "toenail", "toilet", "tom-tom", "tomato", "ton", "tongue", "tooth", "toothbrush", "toothpaste", "top", "tornado", "tortellini", "tortoise", "touch", "tower", "town", "toy", "tractor", "trade", "traffic", "trail", "train", "tramp", "transaction", "transmission", "transport", "trapezoid", "tray", "treatment", "tree", "trial", "triangle", "trick", "trigonometry", "trip", "trombone", "trouble", "trousers", "trout", "trowel", "truck", "trumpet", "trunk", "tsunami", "tub", "tuba", "tuesday", "tugboat", "tulip", "tuna", "tune", "turkey", "turkish", "turn", "turnip", "turnover", "turret", "turtle", "tv", "twig", "twilight", "twine", "twist", "typhoon", "tyvek", "uganda", "ukraine", "ukrainian", "umbrella", "uncle", "underclothes", "underpants", "undershirt", "underwear", "unit", "united kingdom", "unshielded", "use", "utensil", "uzbekistan", "vacation", "vacuum", "valley", "value", "van", "var verbs = [aardvark", "vase", "vault", "vegetable", "vegetarian", "veil", "vein", "velvet", "venezuela", "venezuelan", "verdict", "vermicelli", "verse", "vessel", "vest", "veterinarian", "vibraphone", "vietnam", "view", "vinyl", "viola", "violet", "violin", "virgo", "viscose", "vise", "vision", "visitor", "voice", "volcano", "volleyball", "voyage", "vulture", "waiter", "waitress", "walk", "wall", "wallaby", "wallet", "walrus", "war", "warm", "wash", "washer", "wasp", "waste", "watch", "watchmaker", "water", "waterfall", "wave", "wax", "way", "wealth", "weapon", "weasel", "weather", "wedge", "wednesday", "weed", "weeder", "week", "weight", "whale", "wheel", "whip", "whiskey", "whistle", "white", "wholesaler", "whorl", "wilderness", "william", "willow", "wind", "windchime", "window", "windscreen", "windshield", "wine", "wing", "winter", "wire", "wish", "witch", "withdrawal", "witness", "wolf", "woman", "women", "wood", "wool", "woolen", "word", "work", "workshop", "worm", "wound", "wrecker", "wren", "wrench", "wrinkle", "wrist", "writer", "xylophone", "yacht", "yak", "yam", "yard", "yarn", "year", "yellow", "yew", "yogurt", "yoke", "yugoslavian", "zebra", "zephyr", "zinc", "zipper", "zone", "zoo", "zoology"];
const numbers = ["1", "2", "3", "4", "5", "6", "7", "8", "9", "0"]

// IDs para os diversos tipos de elementos
var maxHubId = 0;
var maxTankId = 0;
var maxValveId = 0;
var maxInputOutputId = 0;
var maxId = 0;
var cou = 0;

const getIdTank = () => `${maxId++}`;
const getIdHub = () => `${maxId++}`;
const getIdVal = () => `${maxId++}`;
const getIdInputOutput = () => `${maxId++}`;

// Matriz de adjacência e nomes dos nós
var adjacencyMatrix = [];
var nodeNames = [];

// Componente DnDFlow
const DnDFlow = () => {
  const reactFlowWrapper = useRef(null);

  const [lastSelect, setLastSelect] = useState(null);

  // Estado dos nós e arestas
  const [nodes, setNodes, onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState([]);
  const [existingEdges, setExistingEdges] = useState([]);
  // Estado para a instância do ReactFlow
  const [reactFlowInstance, setReactFlowInstance] = useState(null);

  // Estado para o nó selecionado e sua categoria
  const [selectedNodeId, setSelectedNodeId] = useState(null);
  const [selected, setSelected] = useState(0);

  const [selectedEdgeSo, setSelectedEdgeSo] = useState(null);
  const [selectedEdgeTa, setSelectedEdgeTa] = useState(null);
  const [selectedEdge, setSelectedEdge] = useState(0);

  // Modal
  const [openModal, setOpenModal] = useState(false);
  const [dblClickedNode, setDblClickedNode] = useState(null);
  const [modalType, setModalType] = useState(null);
  
  // Delete All Modal
  const [openDeleteAllModal, setOpenDeleteAllModal] = useState(false);

  const numNodes = nodes.length;
  adjacencyMatrix = Array.from({ length: numNodes }, () => Array(numNodes).fill(0));
  nodeNames = nodes.map(node => node.data.label);

  // Página

  // Função para buscar as arestas do backend
  const getEdgesFromBackend = async () => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/connections/getAll');
      if (response.ok) {
        const edgesData = await response.json();
        return edgesData;
      } else {
        console.error('Erro ao buscar edges do backend.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar edges do backend:', error);
      return null;
    }
  };

  useEffect(() => {
    if (edges.length < 1) {
      const fetchEdgesFromBackend = async () => {
        try {
          const edgesData = await getEdgesFromBackend();
          if (edgesData) {
            const newEdges = edgesData.map((edgeData) => {
              const { sourceNodeType, sourceNameOrNumber, targetNodeType, targetNameOrNumber } = edgeData;

              // Inicializa as variáveis sourceNode e targetNode
              let sourceNode, targetNode;

              // Condição para lidar com sourceNodeType "Tank"
              if (mapNodeType(sourceNodeType) === "Tank" && mapNodeType(targetNodeType) === "Tank") {

                sourceNode = nodes.find((node) => node.data.label === `${sourceNameOrNumber}` && node.type === "Tank");
                targetNode = nodes.find((node) => node.data.label === `${targetNameOrNumber}` && node.type === "Tank");
              } else if (mapNodeType(sourceNodeType) === "Tank") {

                sourceNode = nodes.find((node) => node.data.label === `${sourceNameOrNumber}` && node.type === "Tank");
                targetNode = nodes.find((node) => node.data.label === targetNameOrNumber && node.type === mapNodeType(targetNodeType));
              } else if (mapNodeType(targetNodeType) === "Tank") {

                sourceNode = nodes.find((node) => node.data.label === sourceNameOrNumber && node.type === mapNodeType(sourceNodeType));
                targetNode = nodes.find((node) => node.data.label === `${targetNameOrNumber}` && node.type === "Tank");

              } else if (mapNodeType(targetNodeType) === "Input") {

                sourceNode = nodes.find((node) => node.data.label === sourceNameOrNumber && node.type === mapNodeType(sourceNodeType));
                targetNode = nodes.find((node) => node.data.label === targetNameOrNumber && node.type === "Input");

              } else if (mapNodeType(sourceNodeType) === "Input") {

                sourceNode = nodes.find((node) => node.data.label === `${sourceNameOrNumber}` && node.type === "Input");
                targetNode = nodes.find((node) => node.data.label === targetNameOrNumber && node.type === mapNodeType(targetNodeType));
              } else {
                sourceNode = nodes.find((node) => node.data.label === sourceNameOrNumber && node.type === mapNodeType(sourceNodeType));
                targetNode = nodes.find((node) => node.data.label === targetNameOrNumber && node.type === mapNodeType(targetNodeType));
              }

              if (sourceNode && targetNode) {
                return {
                  source: sourceNode.id,
                  target: targetNode.id,
                  type: "smoothstep",
                };
              }

              return null;
            }).filter(Boolean);

            setEdges((currentEdges) => [...currentEdges, ...newEdges]);
          }
        } catch (error) {
          console.error('Erro ao buscar arestas do backend:', error);
        }
      };
      fetchEdgesFromBackend(); // Chama a função para buscar as arestas quando o componente for montado
    }
  }, [nodes]); // Certifica-se de que o efeito seja executado quando os nós forem atualizados

  // Construção da matriz de adjacência com base nas arestas
  edges.forEach(edge => {
    var int1 = null;
    var int2 = null;
    try {
      // Encontra os nós de origem e destino com base nas informações da aresta
      nodes.forEach(node => {
        if (node.id == edge.source) {
          int1 = node
        } else if (node.id == edge.target) {
          int2 = node
        }
      });
      const sourceIndex = nodeNames.findIndex(element => element == int1.data.label);
      const targetIndex = nodeNames.findIndex(element => element == int2.data.label);

      // Atualiza a matriz de adjacência para refletir a conexão entre os nós
      if (sourceIndex !== -1 && targetIndex !== -1) {
        adjacencyMatrix[sourceIndex][targetIndex] = 1;
        adjacencyMatrix[targetIndex][sourceIndex] = 1;
      }
      if(cou == 60){
        showPath()
        cou = 0
      } else {
        cou += 1
      }
      // Chama a função showPath()

    } catch (error) {
      console.log(error)
    }
  });

  // Função para mapear os tipos de nó do backend para os tipos de nó do ReactFlow
  const mapNodeType = (backendNodeType) => {
    switch (backendNodeType) {
      case 'HUB':
        return 'Hub';
      case 'Tank':
        return 'Tank';
      case 'Valve':
        return 'Valve';
      case 'EntradaESaida':
        return 'Input'
      default:
        return 'defaultNodeType';
    }
  }

  // Callback para conectar dois nós
  const onConnect = useCallback(async (params) => {
    const { source, target } = params;

    // Cria a aresta no frontend com o tipo `smoothstep`
    setEdges((eds) => addEdge({
      source,
      target,
      type: 'smoothstep',
    }, eds));

    // Extrai o nome e o tipo do nó de origem e destino
    const sourceNode = nodes.find((node) => node.id === source);
    const targetNode = nodes.find((node) => node.id === target);

    if (sourceNode && targetNode) {
      const sourceName = sourceNode.data.label;
      const sourceType = sourceNode.type;
      const sourceNodeId = sourceNode.id
      const targetName = targetNode.data.label;
      const targetType = targetNode.type;
      const targetNodeId = targetNode.id

      // Chama a função para criar a aresta no backend com base nos tipos de nó
      if (sourceType === 'Hub' && targetType === 'Hub') {
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        console.log(typeof (sourceName));
        await createEdgeOnBackend(sourceName, 'HUB', targetName, 'HUB');
      }
      else if (sourceType === 'Hub' && targetType === 'Tank') {
        console.log("maça")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'HUB', targetName, targetType);
      }
      else if (sourceType === 'Hub' && targetType === 'Valve') {
        console.log("banana")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'HUB', targetName, targetType);
      }
      else if (sourceType === 'Hub' && targetType === 'Input') {
        console.log("pera")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'HUB', targetName, 'EntradaESaida');
      }
      else if (sourceType === 'Hub' && targetType === 'Output') {
        console.log("uva")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'HUB', targetName, 'EntradaESaida');
      }

      else if (sourceType === 'Tank' && targetType === 'Hub') {
        console.log("morango")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, 'HUB');
      }
      else if (sourceType === 'Tank' && targetType === 'Tank') {
        console.log("abacaxi")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, targetType);
      }
      else if (sourceType === 'Tank' && targetType === 'Valve') {
        console.log("laranja")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, targetType);
      }
      else if (sourceType === 'Tank' && targetType === 'Input') {
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, 'EntradaESaida');
      }
      else if (sourceType === 'Tank' && targetType === 'Output') {
        console.log("manga")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, 'EntradaESaida');
      }

      else if (sourceType === 'Valve' && targetType === 'Hub') {
        console.log("cereja")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, 'HUB');
      }
      else if (sourceType === 'Valve' && targetType === 'Tank') {
        console.log("melancia")
        console.log(sourceName + "   esse é sourceNameName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, targetType);
      }
      else if (sourceType === 'Valve' && targetType === 'Input') {
        console.log("kiwi")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, 'EntradaESaida');
      }
      else if (sourceType === 'Valve' && targetType === 'Output') {
        console.log("limão")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, sourceType, targetName, 'EntradaESaida');
      }

      else if (sourceType === 'Input' && targetType === 'Hub') {
        console.log("framboesa")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'EntradaESaida', targetName, 'HUB');
      }
      else if (sourceType === 'Input' && targetType === 'Tank') {
        console.log("mamão")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'EntradaESaida', targetName, targetType);
      }
      else if (sourceType === 'Input' && targetType === 'Valve') {
        console.log("maracujá")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'EntradaESaida', targetName, targetType);
      }
      else if (sourceType === 'Input' && targetType === 'Input') {
        console.log("tomate")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'EntradaESaida', targetName, 'EntradaESaida');
      }
      else if (sourceType === 'Input' && targetType === 'Output') {
        console.log("tangerina")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")
        await createEdgeOnBackend(sourceName, 'EntradaESaida', targetName, 'EntradaESaida');
      }
      else {
        console.log("romã")
        console.log(sourceName + "   esse é sourceName")
        console.log(targetName + "   esse é targetName")

        await createEdgeOnBackend(sourceName, sourceType, targetName, targetType);
      }
    }
  }, [nodes]);

  // Callback para o evento de arrastar elementos sobre o painel
  const onDragOver = useCallback((event) => {
    event.preventDefault();

    event.dataTransfer.dropEffect = 'move'; // Permite arrastar elementos
  }, []);

  // Função para criar um nó de Entrada e Saída no backend
  const createInputOutputBackend = async (name, x, y) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/EntradaESaida/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: name,
          "positionX": x,
          "positionY": y
        }),
      });

      if (response.ok) {
        console.log('Entrada/Saída criado com sucesso no backend!');
        console.log(name);
      } else {
        console.error('Erro ao criar Entrada/Saída no backend.');
        console.log(name);
      }
    } catch (error) {
      console.error('Erro ao criar Entrada/Saída no backend:', error);
    }
  };

  // Funções para buscar dados do backend (hubs, tanks, valves, input/output)
  const getHubsFromBackend = async () => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/hubs/');
      if (response.ok) {
        const hubsData = await response.json();
        return hubsData; // Retorna os dados dos hubs do backend
      } else {
        console.error('Erro ao buscar hubs do backend.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar hubs do backend:', error);
      return null;
    }
  };

  const getValvesFromBackend = async () => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/valves/');
      if (response.ok) {
        const valvesData = await response.json();
        return valvesData; // Retorna os dados dos valves do backend
      } else {
        console.error('Erro ao buscar valves do backend.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar valves do backend:', error);
      return null;
    }
  };

  const getTanksFromBackend = async () => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/tank/');
      if (response.ok) {
        const tanksData = await response.json();
        return tanksData; // Retorna os dados dos tanks do backend
      } else {
        console.error('Erro ao buscar tanks do backend.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar tanks do backend:', error);
      return null;
    }
  };

  const getInputOutputFromBackend = async () => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/EntradaESaida/');
      if (response.ok) {
        const InputOutputData = await response.json();
        return InputOutputData; // Retorna os dados dos InputOutput do backend
      } else {
        console.error('Erro ao buscar InputOutput do backend.');
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar InputOutput do backend:', error);
      return null;
    }
  };

  // Funções para criar nós com simulação de posicionamento
  const createHubNodesWithSimulation = (hubData) => {
    const hubs = hubData.map((hub) => ({
      id: `${hub.id}`,
      type: 'Hub',
      data: { label: `${hub.name}` },
    }));

    const simulation = forceSimulation(hubs)
      .force('charge', forceManyBody().strength(-300)) // Força de repulsão
      .force('link', forceLink([]).id((d) => d.id).distance(700)) // Força de ligação
      .force('center', forceCenter(-700, 10)); // Posição central

    // Executa a simulação
    simulation.tick(300);

    const hubNodes = hubs.map((d) => ({
      ...d,
      position: {
        x: d.x,
        y: d.y,
      },
      style: {
        border: '2px solid #7F00FF',
      },
      sourcePosition: 'right',
      targetPosition: 'left',
    }));

    return hubNodes;
  };
  const createTankNodesWithSimulation = (tankData) => {
    const tanks = tankData.map((tank) => ({
      id: `${tank.id}`,
      type: 'Tank',
      data: { label: `${tank.number}` },
    }));

    const simulation = forceSimulation(tanks)
      .force('charge', forceManyBody().strength(-100)) // Força de repulsão
      .force('link', forceLink([]).id((d) => d.id).distance(1800)) // Força de ligação
      .force('center', forceCenter(-500, 5)); // Posição central

    // Executa a simulação
    simulation.tick(300);

    const tankNodes = tanks.map((d) => ({
      ...d,
      position: {
        x: d.x,
        y: d.y,
      },
      style: {
        border: '2px solid #034C8C',
      },
      sourcePosition: 'right',
      targetPosition: 'left',
    }));

    return tankNodes;
  };
  const createValveNodesWithSimulation = (valvesData) => {
    const valves = valvesData.map((valve) => ({
      id: `${valve.id}`,
      type: 'Valve',
      data: { label: valve.name },
    }));

    const simulation = forceSimulation(valves)
      .force('charge', forceManyBody().strength(-2000)) // Força de repulsão
      .force('link', forceLink([]).id((d) => d.id).distance(100)) // Força de ligação
      .force('center', forceCenter(-800, 100)); // Posição central

    // Executa a simulação
    simulation.tick(300);

    const valveNodes = valves.map((d) => ({
      ...d,
      position: {
        x: d.x,
        y: d.y,
      },
      style: {
        border: '2px solid #FF8D59',
      },
      sourcePosition: 'right',
      targetPosition: 'left',
    }));

    return valveNodes;
  };

  const createInputOutputNodesWithSimulation = (inputOutputData) => {
    const inputOutput = inputOutputData.map((inputOutput) => ({
      id: `${inputOutput.id}`,
      type: 'Input',
      data: { label: inputOutput.name },
    }));

    const simulation = forceSimulation(inputOutput)
      .force('charge', forceManyBody().strength(-100)) // Força de repulsão
      .force('link', forceLink([]).id((d) => d.id).distance(1800)) // Força de ligação
      .force('center', forceCenter(-800, 100)); // Posição central

    // Executa a simulação
    simulation.tick(300);

    const inputOutputNodes = inputOutput.map((d) => ({
      ...d,
      position: {
        x: d.x,
        y: d.y,
      },
      style: {
        border: '2px solid #F29BCB',
      },
      sourcePosition: 'right',
      targetPosition: 'left',
    }));

    return inputOutputNodes;
  };

  // Função para buscar dados de hubs, tanks, valves e input/output do backend e criar os nós correspondentes
  useEffect(() => {
    async function fetchData() {
      const hubsData = await getHubsFromBackend();
      const tanksData = await getTanksFromBackend();
      const valvesData = await getValvesFromBackend();
      const inputOutputData = await getInputOutputFromBackend();

      if (hubsData && tanksData && valvesData && inputOutputData) {
        // Cria os nós no ReactFlow com base nos dados do backend e as simulações de posicionamento
        const hubNodes = createHubNodesWithSimulation(hubsData);
        const tankNodes = createTankNodesWithSimulation(tanksData);
        const valveNodes = createValveNodesWithSimulation(valvesData);
        const inputOutputNodes = createInputOutputNodesWithSimulation(inputOutputData);
        const allNodes = [...initialNodes, ...hubNodes, ...tankNodes, ...valveNodes, ...inputOutputNodes];

        maxHubId = Math.max(...hubsData.map(hub => hub.id));
        maxTankId = Math.max(...tanksData.map(tank => tank.id));
        maxValveId = Math.max(...valvesData.map(valve => valve.id));
        maxInputOutputId = Math.max(...inputOutputData.map(inputOutput => inputOutput.id))
        maxId = Math.max(maxHubId, maxTankId, maxValveId, maxInputOutputId, 0);
        setNodes(allNodes);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchData() {
      const hubsData = await getHubsFromBackend();
      const tanksData = await getTanksFromBackend();
      const valvesData = await getValvesFromBackend();
      const inputOutputData = await getInputOutputFromBackend();

      if (hubsData && tanksData && valvesData && inputOutputData) {
        maxHubId = Math.max(...hubsData.map(hub => hub.id));
        maxTankId = Math.max(...tanksData.map(tank => tank.id));
        maxValveId = Math.max(...valvesData.map(valve => valve.id));
        maxInputOutputId = Math.max(...inputOutputData.map(inputOutput => inputOutput.id))
        maxId = Math.max(maxHubId, maxTankId, maxValveId, 0, maxInputOutputId, maxId);
      }
    }

    fetchData();
  }, [nodes]);

  //função para criar arestas no backend
  const createEdgeOnBackend = async (sourceName, sourceType, targetName, targetType) => {

    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/genericEdges/createEdge', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "typeStart": sourceType,
          "nameOrNumberStart": sourceName,
          "typeEnd": targetType,
          "nameOrNumberEnd": targetName
        }),
      });

      if (response.ok) {
        console.log('Aresta criada com sucesso no backend!');
        console.log('nó inicial: ' + sourceName + ' nóFinal: ' + targetName);
        console.log(sourceType + "tipo SOURCE")
        console.log(targetType + "tipo target")
      } else {
        console.error('Erro ao criar a aresta no backend.');
        console.log('nó inicial: ' + sourceName + ' nóFinal: ' + targetName);
      }
    } catch (error) {
      console.error('Erro ao criar a aresta no backend:', error);
    }
  };

  // Função para criar um hub no backend
  const createHubOnBackend = async (hubName, x, y) => {

    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/hubs/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: hubName,
          "positionX": x,
          "positionY": y
        }),
      });

      if (response.ok) {
        console.log('Hub criado com sucesso no backend!');
        console.log(hubName);
      } else {
        console.error('Erro ao criar o hub no backend.');
        console.log(hubName);
      }
    } catch (error) {
      console.error('Erro ao criar o hub no backend:', error);
    }
  };

  // Função para criar um tanque no backend
  const createTankOnBackend = async (TankNumber, x, y) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/tank/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          number: TankNumber,
          "positionX": x,
          "positionY": y
        }),
      });

      if (response.ok) {
        console.log('Tank criado com sucesso no backend!');
        console.log(TankNumber);
        console.log("arestas")
        console.log(edges);

      } else {
        console.error('Erro ao criar o Tank no backend.');
        console.log(TankNumber);
      }
    } catch (error) {
      console.error('Erro ao criar o Tank no backend:', error);
    }
  };

  // Função para criar uma válvula no backend
  const createValvulaOnBackend = async (ValvulaName, x, y) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/valves/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: ValvulaName,
          "positionX": x,
          "positionY": y
        }),
      });

      if (response.ok) {
        console.log('Valvula criada com sucesso no backend!');
        console.log(ValvulaName);
      } else {
        console.error('Erro ao criar o Valvula no backend.');
        console.log(ValvulaName);
      }
    } catch (error) {
      console.error('Erro ao criar o Valvula no backend:', error);
    }
  };

  // Função para deletar um hub do backend
  const deleteHubOnBackend = async (hubName) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/hubs/' + hubName, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: hubName }),
      });

      if (response.ok) {
        console.log('Hub deletado com sucesso no backend!');
        console.log(hubName);
      } else {
        console.error('Erro ao deletar o hub no backend.');
        console.log(hubName);
      }
    } catch (error) {
      console.error('Erro ao deletar o hub no backend:', error);
    }
  };

  // Função para deletar um tanque no backend
  const deleteTankOnBackend = async (TankNumber) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/tank/' + TankNumber, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ number: TankNumber }),
      });

      if (response.ok) {
        console.log('Tank deletado com sucesso no backend!');
        console.log(TankNumber);
      } else {
        console.error('Erro ao deletar o Tank no backend.');
        console.log(TankNumber);
      }
    } catch (error) {
      console.error('Erro ao deletar o Tank no backend:', error);
    }
  };

  // Função para deletar uma valvula no backend
  const deleteValveOnBackend = async (ValveName) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/valves/deleteValve', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: ValveName }),
      });

      if (response.ok) {
        console.log('Valve deletado com sucesso no backend!');
        console.log(ValveName);
      } else {
        console.error('Erro ao deletar o Valve no backend.');
        console.log(ValveName);
      }
    } catch (error) {
      console.error('Erro ao deletar o Valve no backend:', error);
    }
  };

  // Função para deletar um input e output do backend
  const deleteInputOutputOnBackend = async (InputOutputName) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/EntradaESaida/deleteByName', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: InputOutputName }),
      });

      if (response.ok) {
        console.log('InputOutput deletado com sucesso no backend!');
        console.log(InputOutputName);
      } else {
        console.error('Erro ao deletar o InputOutput no backend.');
        console.log(InputOutputName);
      }
    } catch (error) {
      console.error('Erro ao deletar o InputOutput no backend:', error);
    }
  };

  const deleteEdgeOnBackend = async (sourceName, sourceType, targetName, targetType) => {
    try {
      const response = await fetch('https://back-roots.onrender.com/api/v1/genericEdges/deleteEdge', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          "typeStart": sourceType,
          "nameOrNumberStart": sourceName,
          "typeEnd": targetType,
          "nameOrNumberEnd": targetName
        }),
      });
      if (response.ok) {
        console.log('edge deletado com sucesso no backend!');
        console.log(sourceName + " -> " + targetName);
      } else {
        console.error('Erro ao deletar o edge no backend.');
        console.log(sourceName + " -> " + targetName);
      }
    } catch (error) {
      console.error('Erro ao deletar o Valve no backend:', error);
    }
  };

  // Função para lidar com o clique em um nó
  const handleClickNode = (event, node) => {
    setNodes((prevNodes) =>
      prevNodes.map((prevNode) => {
        if (prevNode.id === node.id) {
          return {
            ...prevNode,
          };
        } else {
          return {
            ...prevNode,
          };
        }
      })
    );
    setSelected(selected === 1 ? 2 : 1);
    setSelectedNodeId(node.id);
    setLastSelect("node")
  };

  // Função para selecionar um nó
  const select = (event, element) => {
    handleClickNode(event, element);
    setSelectedNodeId(element.id);
  };

  //Função que seleciona a aresta
  const selectE = (event, element) => {
    setSelectedEdge(element)
    console.log(nodes.find(node => element.source == node.id).data.label)
    setSelectedEdgeSo(element.source)
    setSelectedEdgeTa(element.target)
    setLastSelect("edge")
  }


  // Função para destacar caminho no gráfico
  function showPath() {
    if(edges.length > 0){
      var change = []
      edges.forEach(edge => {
        edge.style = { strokeWidth: "1px", stroke: "gray" };
        for (var i = 0; i < nodeNames.length - 1; i++){
          if (edge.source == nodesPath[i] && edge.target == nodesPath[i + 1]) {
            edge.style = { strokeWidth: "5px", stroke: "green" };
          }
        }
        change.push(edge)
      })
      setEdges(current =>[...change])
    }

  };

  // Callback para o evento de soltar um elemento no painel
  const onDrop = useCallback(
    (event) => {
      event.preventDefault();

      const reactFlowBounds = reactFlowWrapper.current.getBoundingClientRect();
      const type = event.dataTransfer.getData('application/reactflow');

      if (!type) {
        return;
      }

      let borderColor = '';

      switch (type) {
        case 'Input':
          borderColor = '#F29BCB';
          break;
        case 'Hub':
          borderColor = '#7F00FF';
          break;
        case 'Tank':
          borderColor = '#034C8C';
          break;
        case 'Valve':
          borderColor = '#FF8D59';
          break;
        case 'Output':
          borderColor = '#F24738';
          break;
        default:
          borderColor = '#0a5c0a';
          break;
      }

      const position = reactFlowInstance.project({
        x: event.clientX - reactFlowBounds.left,
        y: event.clientY - reactFlowBounds.top,
      });

      let name = type + "_" + nouns[Math.floor(Math.random() * nouns.length)] + "_" + numbers[Math.floor(Math.random() * numbers.length)] + numbers[Math.floor(Math.random() * numbers.length)] + numbers[Math.floor(Math.random() * numbers.length)]
      let number = Math.floor(Math.random() * 10000)

      const newNode = {
        id: type === "Tank" ? (parseInt(getIdTank()) + 1).toString() : type === "Valve" ? (parseInt(getIdVal()) + 1).toString() : type === "Hub" ? (parseInt(getIdHub()) + 1).toString() : type === 'Output' ? (parseInt(getIdInputOutput()) + 1).toString() : type === 'Input' ? (parseInt(getIdInputOutput()) + 1).toString() : null,
        type,
        position,
        targetPosition: 'left',
        sourcePosition: 'right',
        data: { label: type == "Tank" ? number.toString() : type === 'Input' ? "Input/Output" + "_" + nouns[Math.floor(Math.random() * nouns.length)] + "_" + numbers[Math.floor(Math.random() * numbers.length)] + numbers[Math.floor(Math.random() * numbers.length)] + numbers[Math.floor(Math.random() * numbers.length)] :  name },
        style: { border: `2px solid ${borderColor}` },
      };

      setNodes((nds) => nds.concat(newNode));

      if (type === 'Hub') {
        createHubOnBackend(name, newNode.position.x, newNode.position.y);
      }

      if (type === 'Tank') {
        createTankOnBackend(number, newNode.position.x, newNode.position.y);
      }

      if (type === 'Valve') {
        createValvulaOnBackend(name, newNode.position.x, newNode.position.y);
      }
      if (type === 'Input') {
        createInputOutputBackend(name === null ? "mosto" : newNode.data.label, newNode.position.x, newNode.position.y);
      }
      if (type === 'Output') {
        createInputOutputBackend(name === null ? "filtration" : name, newNode.position.x, newNode.position.y);
      }
    },
    [reactFlowInstance]
  );

  // Função para excluir todos os nós e conexões no backend
  const deleteAllNodesAndConnections = (event) => {
    event.stopPropagation();
    setOpenDeleteAllModal(true);
  }

  //Função que decide se é um nó ou uma aresta que será excluida
  const deleteSelected = async () =>{
    if(lastSelect==="node"){
      deleteSelectedNode()
    } else if (lastSelect === "edge"){
      deleteSelectedEdge()
    }
  }

  //FUnção para deletar a aresta selecionada
  const deleteSelectedEdge = async () => {
    const aresta = edges.find((edge) => edge.source == selectedEdgeSo && edge.target === selectedEdgeTa)
    const nodeS = nodes.find(node => node.id == selectedEdgeSo)
    const nodeT = nodes.find(node => node.id == selectedEdgeTa)
    setEdges(prevEdge => prevEdge.filter((edge) => edge.source != nodeS.id && edge.target != nodeT.id))
    deleteEdgeOnBackend(nodeS.data.label, nodeS.type, nodeT.data.label, nodeT.type)
  }

  // Função para deletar o nó selecionado
  const deleteSelectedNode = async () => {
    if (selectedNodeId) {
      const nodeToDelete = nodes.find((node) => node.id === selectedNodeId);

      if (nodeToDelete && nodeToDelete.type === 'Input') {
        await deleteInputOutputOnBackend(nodeToDelete.data.label);
      }

      if (nodeToDelete && nodeToDelete.type === 'Output') {
        await deleteInputOutputOnBackend(nodeToDelete.data.label);
      }
      if (nodeToDelete && nodeToDelete.type === 'Tank') {
        await deleteTankOnBackend(nodeToDelete.data.label);
      }

      if (nodeToDelete && nodeToDelete.type === 'Hub') {
        await deleteHubOnBackend(nodeToDelete.data.label);
      }

      if (nodeToDelete && nodeToDelete.type === 'Valve') {
        await deleteValveOnBackend(nodeToDelete.data.label);
      }

      setNodes((prevNodes) => prevNodes.filter((node) => node.id !== selectedNodeId));
      setSelectedNodeId(null);
    }
  };

  //Função que executa o modal quando o nó é clicado duas vezes
  const handleNodeDoubleClick = (event, node) => {
    event.stopPropagation();
    setDblClickedNode(node.data.label);
    setModalType(node.type)
    setOpenModal(true);
  };


  return (
    <div className="dndflow">
      <ReactFlowProvider>
        <div className="reactflow-wrapper" ref={reactFlowWrapper}>
          <ReactFlow
            nodes={nodes}
            edges={edges}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onInit={setReactFlowInstance}
            onDrop={onDrop}
            onDragOver={onDragOver}
            fitView
            elementsSelectable
            onEdgeClick={selectE}
            onNodeClick={select}
            minZoom={0.02}
            onNodeDoubleClick={handleNodeDoubleClick}
          >
            <Background id="1" gap={10} color="#f1f1f1" variant={BackgroundVariant.Lines} />
            <Background id="2" gap={100} offset={1} color="#ccc" variant={BackgroundVariant.Lines} />
            <Controls />
          </ReactFlow>
        </div>
      </ReactFlowProvider>
      <div>
        <Button />
      </div>
      <div style={{ position: "absolute", top: "2px", left: "70%" }}>
        <IconButton onClick={deleteSelected} aria-label="delete">
          <DeleteIcon fontSize="large" style={{ color: 'green' }} />
        </IconButton>
      </div>
      <BasicModal open={openModal} setOpen={setOpenModal} name={dblClickedNode} type={modalType} setNodes={setNodes} nodes={nodes} />
      <DeleteAllModal open={openDeleteAllModal} setOpen={setOpenDeleteAllModal} />
      <div style={{ position: "absolute", top: "90%", left: "70%" }}>
        <IconButton onClick={deleteAllNodesAndConnections}>
          <DeleteForeverIcon fontSize="large" style={{ color: 'green' }} aria-label="Deletar tudo" />
        </IconButton>
      </div>
    </div>
  );
};

// Exporta a matriz de adjacência e os nomes dos nós
export { adjacencyMatrix };
export { nodeNames };

export default DnDFlow;