// src/constants.js
export const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const regions = [
  "Metro Manila",
  "Mindanao",
  "North Luzon",
  "South Luzon",
];

export const provinces = {
  "Metro Manila": [
    "NCR First District",
    "NCR Second District",
    "NCR Third District",
    "NCR Fourth District",
  ],
  Mindanao: ["Davao", "Zamboanga", "Bukidnon", "Misamis Oriental"],
  "North Luzon": ["Pangasinan", "Ilocos Norte", "Ilocos Sur", "La Union"],
  "South Luzon": ["Rizal", "Batangas", "Cavite", "Laguna", "Quezon"],
};

export const cities = {
  "NCR First District": ["Manila", "Caloocan", "Navotas", "Malabon"],
  "NCR Second District": ["Quezon City", "San Juan", "Marikina", "Pasig"],
  "NCR Third District": ["Makati", "Pasay", "Taguig", "Pateros"],
  "NCR Fourth District": ["Las Piñas", "Muntinlupa", "Parañaque", "Valenzuela"],
  Davao: ["Davao City", "Tagum", "Panabo", "Digos"],
  Zamboanga: ["Zamboanga City", "Pagadian", "Dipolog", "Dapitan"],
  Bukidnon: ["Malaybalay", "Valencia", "Maramag", "Manolo Fortich"],
  "Misamis Oriental": ["Cagayan de Oro", "Gingoog", "El Salvador", "Jasaan"],
  Pangasinan: ["Dagupan", "Alaminos", "San Carlos", "Urdaneta"],
  "Ilocos Norte": ["Laoag", "Batac", "Vigan", "Candon"],
  "Ilocos Sur": ["Vigan", "Candon", "Santa Maria", "Bantay"],
  "La Union": ["San Fernando", "Agoo", "Bauang", "Naguilian"],
  Rizal: ["Binangonan", "Cainta", "Taytay", "Antipolo"],
  Batangas: ["Batangas City", "Lipa", "Tanauan", "Santo Tomas"],
  Cavite: ["Cavite City", "Dasmarinas", "Imus", "Bacoor"],
  Laguna: ["Santa Cruz", "Calamba", "San Pablo", "Biñan"],
  Quezon: ["Lucena", "Tayabas", "Candelaria", "Sariaya"],
};

export const barangays = {
  Manila: ["Binondo", "Ermita", "Intramuros", "Malate", "Quiapo"],
  Caloocan: ["Bagong Silang", "Camarin", "Novaliches", "Bagumbong", "Tala"],
  Navotas: [
    "Bagumbayan North",
    "Bangculasi",
    "Daanghari",
    "Navotas East",
    "San Roque",
  ],
  Malabon: ["Acacia", "Baritan", "Concepcion", "Flores", "Hulong Duhat"],
  "Quezon City": ["Diliman", "Cubao", "Kamuning", "Novaliches", "Project 6"],
  "San Juan": [
    "Addition Hills",
    "Balong-Bato",
    "Corazon de Jesus",
    "Greenhills",
    "Kabayanan",
  ],
  Marikina: ["Barangka", "Concepcion Uno", "Fortune", "Malanday", "Parang"],
  Pasig: ["Bagong Ilog", "Kapitolyo", "Manggahan", "Oranbo", "Santolan"],
  Makati: ["Bel-Air", "Forbes Park", "Poblacion", "San Lorenzo", "Urdaneta"],
  Pasay: ["Baclaran", "Malibay", "Maricaban", "San Isidro", "Tramo"],
  Taguig: ["Bagumbayan", "Bambang", "Fort Bonifacio", "Hagonoy", "Ibayo-Tipas"],
  Pateros: ["Aguho", "Magtanggol", "Martires del 96", "Poblacion", "San Pedro"],
  "Las Piñas": [
    "Almanza Dos",
    "B.F. International Village",
    "Pamplona Tres",
    "Pilar",
    "Talon Dos",
  ],
  Muntinlupa: ["Alabang", "Bayanan", "Buli", "Cupang", "Poblacion"],
  Parañaque: ["Baclaran", "Don Bosco", "La Huerta", "San Antonio", "Tambo"],
  Valenzuela: [
    "Arkong Bato",
    "Bagbaguin",
    "Bignay",
    "Canumay East",
    "Lawang Bato",
  ],
  "Davao City": ["Poblacion", "Toril", "Buhangin", "Talomo", "Agdao"],
  Tagum: [
    "Apokon",
    "Bincungan",
    "La Filipina",
    "Magugpo Poblacion",
    "New Balamban",
  ],
  Panabo: ["Dujali", "Gredu", "J.P. Laurel", "New Pandan", "Poblacion"],
  Digos: ["Aplaya", "Balabag", "Colorado", "Dulangan", "Poblacion"],
  "Zamboanga City": ["Ayala", "Baliwasan", "Boalan", "Camino Nuevo", "Guiwan"],
  Pagadian: ["Balangasan", "Baloybangka", "Bomba", "Bulatok", "Danlugan"],
  Dipolog: ["Barra", "Central", "Cogon", "Estaka", "Galas"],
  Dapitan: ["Aliguay", "Bagting", "Banbanan", "Bulahan", "Canlucani"],
  Malaybalay: ["Aglayan", "Bangcud", "Busdi", "Casisang", "Dalwangan"],
  Valencia: ["Bagontaas", "Banlag", "Catumbalon", "Lumbayao", "Poblacion"],
  Maramag: ["Aglayan", "Bagontaas", "Dalwangan", "Kuya", "Poblacion"],
  "Manolo Fortich": ["Alae", "Dahilayan", "Damilag", "Maluko", "Poblacion"],
  "Cagayan de Oro": ["Barangay 1", "Barangay 2", "Carmen", "Gusa", "Lapasan"],
  Gingoog: ["Anakan", "Bal-ason", "Lawaan", "Poblacion", "Talisayan"],
  "El Salvador": ["Hipantag", "Katipunan", "Poblacion", "Salvacion", "Tambo"],
  Jasaan: ["Aplaya", "Bobuntugan", "Jasaan", "Luz Banzon", "Poblacion"],
  Dagupan: ["Calmay", "Lucao", "Malued", "Tapuac", "Bonuan"],
  Alaminos: ["Amandiego", "Bolaney", "Cabatuan", "Lucap", "Poblacion"],
  "San Carlos": ["Anando", "Ano", "Bacnar", "Balite Norte", "Poblacion"],
  Urdaneta: ["Anonas", "Bactad East", "Bayaoas", "Camantiles", "Poblacion"],
  Laoag: ["Barangay 1", "Barangay 2", "Buttong", "Gabu Norte", "Nangalisan"],
  Batac: ["Aglipay", "Baay", "Baligat", "Biningan", "Poblacion"],
  Vigan: ["Ayudan Norte", "Barangay I", "Barangay II", "Bulala", "Camangaan"],
  Candon: ["Allangigan", "Amguid", "Bagani", "Bugnay", "Poblacion"],
  "San Fernando": [
    "Bacsil",
    "Bangbangolan",
    "Bauang",
    "Calabugao",
    "Poblacion",
  ],
  Agoo: ["Ambitacay", "Balawang", "Consolacion", "Macalva", "Poblacion"],
  Bauang: ["Bacsil", "Bagulin", "Bawanta", "Central East", "Poblacion"],
  Naguilian: ["Aguioas", "Barangay I", "Barangay II", "Guesset", "Poblacion"],
  Binangonan: [
    "Batingan",
    "Calumpang",
    "Darangan",
    "Mahabang Parang",
    "Pantok",
  ],
  Cainta: ["Dayap", "Dollores", "Mambugan", "Poblacion", "San Andres"],
  Taytay: ["Bagumbayan", "Dolores", "Muzon", "Poblacion", "San Juan"],
  Antipolo: [
    "Bagong Nayon",
    "Beverly Hills",
    "Cupang",
    "Dalig",
    "San Jose",
    "Sta. Cruz",
  ],
  "Batangas City": ["Alangilan", "Balagtas", "Kumintang", "Soro-soro", "Wawa"],
  Lipa: ["Adya", "Anilao", "Bagong Pook", "Balintawak", "Poblacion"],
  Tanauan: ["Altura Bata", "Altura Matanda", "Ambulong", "Balele", "Poblacion"],
  "Santo Tomas": [
    "Barangay 1",
    "Barangay 2",
    "San Bartolome",
    "San Felix",
    "San Rafael",
  ],
  "Cavite City": [
    "Caridad",
    "Dalahican",
    "Poblacion Dos",
    "San Antonio",
    "Santa Cruz",
  ],
  Dasmarinas: ["Bagong Bayan", "Burol", "Langkaan", "Paliparan", "Poblacion"],
  Imus: ["Alapan", "Anabu", "Bayan Luma", "Bucandala", "Poblacion"],
  Bacoor: ["Alima", "Aniban", "Bayanan", "Molino", "Poblacion"],
  "Santa Cruz": [
    "Bagumbayan",
    "Bubukal",
    "Duhat",
    "Poblacion",
    "San Pablo Sur",
  ],
  Calamba: ["Bagong Kalsada", "Banadero", "Barangay I", "Burol", "Poblacion"],
  "San Pablo": [
    "Bagong Bayan",
    "Balagbag",
    "Dolores",
    "Poblacion",
    "San Buenaventura",
  ],
  Biñan: ["Biñan", "Canlalay", "Dela Paz", "Poblacion", "Santo Niño"],
  Lucena: [
    "Barangay 1",
    "Barangay 2",
    "Dalahican",
    "Ibabang Dupay",
    "Poblacion",
  ],
  Tayabas: ["Alitao", "Ayusan", "Bukal", "Isabang", "Poblacion"],
  Candelaria: [
    "Bagong Silang",
    "Bukal",
    "Kinatihan",
    "Poblacion",
    "San Andres",
  ],
  Sariaya: [
    "Bagong Pook",
    "Concepcion Banahaw",
    "Gibanga",
    "Poblacion",
    "Sampaloc",
  ],
};
