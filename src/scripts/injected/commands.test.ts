import { returnSame } from "./commands";

test("test1", () => {
    expect(returnSame("hi")).toBe("hi");
});
