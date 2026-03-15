import { init as initList } from "./patients/list/list.init.js";
import { initDetails } from "./patients/details/details.init.js";
import { initApp } from "./app/init.js";
import { initSearch } from "./patients/search/search.index.js";

await initApp();
await initList();
initDetails();
initSearch();
