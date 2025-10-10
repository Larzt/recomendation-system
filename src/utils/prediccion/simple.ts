import { useFileInfoStore } from "@/store";

const useFileInfo = useFileInfoStore();
console.log(useFileInfo.file);
