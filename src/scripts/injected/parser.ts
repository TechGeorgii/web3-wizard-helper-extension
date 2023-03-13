import { FindDecodedTableDetail } from "./DuneOperations/FindDecodedTableDetail";
import { FindTableDetail } from "./DuneOperations/FindTableDetail";

class Parser {
    rawTablesMap: Map<string, Set<string>>;
    namespacesCategory = new Map<string, string>();

    constructor() {
        const ethCommonTables = ["blocks", "creation_traces", "logs", "logs_decoded", "traces", "traces_decoded", "transactions"];
        const commonEthChains = ["arbitrum", "avalanche_c", "bnb", "ethereum", "fantom", "gnosis", "optimism", "optimism_legacy_ovm1", "polygon"];

        this.rawTablesMap = new Map([
            ["solana", new Set(["account_activity", "blocks", "rewards", "transactions", "vote_transactions"])],
            ["goerli", new Set([...ethCommonTables, ...["state_balances", "state_storage"]])],
            ["bitcoin", new Set(["blocks", "inputs", "outputs", "transactions"])]
        ]);

        for (let tbl of commonEthChains)
            this.rawTablesMap.set(tbl, new Set(ethCommonTables));
    }

    findLexem(str: string, idx: number): string {
        let start = idx;
        let end = idx;
        const regex = /[a-zA-Z0-9_\.]/;

        while (start >= 0 && regex.test(str[start])) {
            start--;
        }

        while (end < str.length && regex.test(str[end])) {
            end++;
        }

        return str.slice(start + 1, end);
    }

    parseLexem(lexem: string): FindTableDetail | FindDecodedTableDetail | null {
        // sanity checks =====================================
        const dotSplitted = lexem.split('.');
        if (dotSplitted.length != 2)    // table must contain strictly two parts
            return null;

        if (dotSplitted.indexOf("") != -1)   // can't start or end with '.'
            return null;

        const leftSplitted = dotSplitted[0].split('_');
        const rightSplitted = dotSplitted[1].split('_');

        if (leftSplitted.includes("") || rightSplitted.includes(""))
            return null;    // cannot start or end in '_', also no sequental '_'s.
        // sanity checks =====================================


        const set = this.rawTablesMap.get(dotSplitted[0].toLowerCase());
        if (set != null) {
            // raw or spell like 'arbitrum.contracts_submitted'

            let res = new FindTableDetail(lexem);
            res.blockchain = dotSplitted[0].toLowerCase();
            res.namespace = res.blockchain;

            // not sure if we strictly need it but let it be
            res.category = set.has(dotSplitted[1].toLowerCase()) ? "canonical" : "abstraction";
            res.tableName = dotSplitted[1].toLowerCase();
            return res;
        }

        if (leftSplitted.length == 1) { // one component and not in blockchain list
            // it is spell like prices.usd, dao.proposals, gas.fees that contain column 'blockchain' in them.

            const res = new FindTableDetail(lexem);
            res.category = this.namespacesCategory.get(dotSplitted[0].toLowerCase()) ?? "abstraction";
            res.namespace = dotSplitted[0];
            res.tableName = dotSplitted[1];
            return res;
        }

        const blockchain = leftSplitted[leftSplitted.length - 1].toLowerCase();
        if (!this.rawTablesMap.has(blockchain)) // this must be always a blockchain
            return null;

        leftSplitted.pop(); // remove blockchain
        const namespace = leftSplitted.join("_");

        const returnDetail = () => {
            let res = new FindTableDetail(lexem);
            res.blockchain = blockchain;
            res.category = "abstraction";
            res.namespace = namespace;
            res.tableName = dotSplitted[1];
            return res;
        };

        if (rightSplitted.length < 3) // does not fit decoded table (like "Pair_call_burn")
            return returnDetail();

        // looking for "evt" or "call" to see if it is a decoded table.
        for (var i = 1; i < rightSplitted.length - 1; i++) {
            var tok = rightSplitted[i].toLowerCase();
            if (["evt", "call"].includes(tok)) {
                // this is a detail table
                let decoded = new FindDecodedTableDetail(lexem);
                decoded.blockchain = blockchain;
                decoded.namespace = namespace;
                decoded.contractName = rightSplitted.slice(0, i).join("_");
                decoded.abi = rightSplitted.slice(i + 1).join("_");
                decoded.memberType = tok;
                return decoded;
            }
        }

        return returnDetail();
    }

    setNamespacesCategory(namespaces: string[], category: string) {
        for (var ns of namespaces)
            this.namespacesCategory.set(ns.toLowerCase(), category);
    }
}

const parser = new Parser();
export { parser, Parser };
