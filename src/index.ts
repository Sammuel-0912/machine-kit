import { listMachines } from "./client.js";

async function main() {
  try {
    const machines = await listMachines('http://localhost:8000');
    // ❌ 錯誤範例 1 (故意觸發雷點)：
    // machines[0] 因 noUncheckedIndexedAccess 變為 MachineListItem | undefined
    // status 因型別定義變為 string | null
    // 執行以下代碼：
    // 使用 optional chaining 與條件判斷過濾 undefined 及 null
    const firstMachine = machines[0];
    if (firstMachine?.status) {
      console.log(`首台機台狀態：${firstMachine.status.toUpperCase()}`);
    } else {
      console.log('無法存取首台機台或狀態為 null');
    }
  }
  catch (error) {
    console.error('執行失敗：', error);
  }
}
main();