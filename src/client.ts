import type {MachineListItem} from './types.js';

/**
 * 型別守衛：驗證未知資料是否符合 MachineListItem 型別結構
 */

export function isMachineListItem(x: unknown): x is MachineListItem {
    if(typeof x !== 'object' || x == null) {
        return false;
    }
    const obj = x as Record<string, unknown>;

    const hasValidId = typeof obj['id'] === 'number';
    const hasValidName = typeof obj['name'] == 'string';
    const hasValidStatus = typeof obj['status'] === 'string' || obj['status'] === null;
    const hasValidLocation = typeof obj['location'] === 'string' || obj['location'] === null;

    return hasValidId && hasValidName && hasValidStatus && hasValidLocation;

}

/**
 * 取得機台列表 SDK
 */

export async function listMachines(baseUrl: string): Promise<MachineListItem[]> {
    const res = await fetch(`${baseUrl}/machines`);
    if (!res.ok) {
        throw new Error(`HTTP Error: ${res.status}`);
    }
    // 1. 強制收攏為 unknown，拒絕預設的 any
    const data: unknown = await res.json();

    // 2. 驗證資料結構是否為陣列，且陣列內的元素皆符合型別守衛
    if (!Array.isArray(data) || !data.every(isMachineListItem)) {
        throw new TypeError(`API 回傳格式不符：非有效的 MachineListItem[]`);
    }
    // 3. 通過檢查後，TS 會自動推導 data 為 MachineListItem[]
    return data;
}