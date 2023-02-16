import { parser } from "./parser";
import { FindDecodedTableDetail, FindTableDetail } from "./TableOperation";

const decoded = [
    ["aavegotchi_polygon.aavegotchi_diamond_call_aavegotchiClaimTime",
        { ns: "aavegotchi", bc: "polygon", cn: "aavegotchi_diamond", mt: "call", abi: "aavegotchiClaimTime" }],

    ["uniswap_v3_arbitrum.Pair_call_burn",
        { ns: "uniswap_v3", bc: "arbitrum", cn: "Pair", mt: "call", abi: "burn" }],

    ["uniswap_ethereum.Factory_call_createExchange",
        { ns: "uniswap", bc: "ethereum", cn: "Factory", mt: "call", abi: "createExchange" }],

    ["arrakis_optimism.ArrakisFactoryV1_evt_PoolCreated",
        { ns: "arrakis", bc: "optimism", cn: "ArrakisFactoryV1", mt: "evt", abi: "PoolCreated" }],

    ["0xdao_fantom.Oxd_call_allowance",
        { ns: "0xdao", bc: "fantom", cn: "Oxd", mt: "call", abi: "allowance" }],
];

const raw = [
    ["ethereum.traces", { ns: "ethereum", bc: "ethereum", tn: "traces" }],
    ["polygon.transactions", { ns: "polygon", bc: "polygon", tn: "transactions" }],
    ["optimism_legacy_ovm1.traces", { ns: "optimism_legacy_ovm1", bc: "optimism_legacy_ovm1", tn: "traces" }]
];

const spells = [
    ["blur_ethereum.mints", { ns: "blur", bc: "ethereum", tn: "mints" }],
    ["aave_v2_ethereum.interest", { ns: "aave_v2", bc: "ethereum", tn: "interest" }],
    ["arbitrum.contracts_submitted", { ns: "arbitrum", bc: "arbitrum", tn: "contracts_submitted" }]
];

test("Test decoded tables (positive)", () => {
    for (let tc of decoded) {
        const lex = tc[0] as string;
        const exp = tc[1] as { ns: string, bc: string, cn: string, mt: string, abi: string };
        const res = parser.parseLexem(lex);
        expect(res).toBeInstanceOf(FindDecodedTableDetail);

        const typed = res as FindDecodedTableDetail;
        expect(typed.abi).toBe(exp.abi);
        expect(typed.namespace).toBe(exp.ns);
        expect(typed.blockchain).toBe(exp.bc);
        expect(typed.contractName).toBe(exp.cn);
        expect(typed.memberType).toBe(exp.mt);
    }
});

test("Test raw and spell tables (positive)", () => {
    for (let tc of [...raw, ...spells]) {
        const lex = tc[0] as string;
        const exp = tc[1] as { ns: string, bc: string, tn: string };
        const res = parser.parseLexem(lex);
        expect(res).toBeInstanceOf(FindTableDetail);

        const typed = res as FindTableDetail;
        expect(typed.namespace).toBe(exp.ns);
        expect(typed.blockchain).toBe(exp.bc);
        expect(typed.tableName).toBe(exp.tn);
    }
});
