import * as equateFood from "./equateFood"
// @ponicode
describe("equateFood.default", () => {
    test("0", () => {
        equateFood.default({ kcal: 56784, protein: "bc23a9d531064583ace8f67dad60f6bb", fats: "a1969970175", carbs: 12 }, { kcal: "bc23a9d531064583ace8f67dad60f6bb", protein: 12345, fats: "bc23a9d531064583ace8f67dad60f6bb", carbs: 987650 }, "kcal")
    })

    test("1", () => {
        equateFood.default({ kcal: 12, protein: 987650, fats: 12, carbs: "a1969970175" }, { kcal: 987650, protein: 12345, fats: "bc23a9d531064583ace8f67dad60f6bb", carbs: "bc23a9d531064583ace8f67dad60f6bb" }, 23306)
    })

    test("2", () => {
        equateFood.default({ kcal: 56784, protein: "a1969970175", fats: "a1969970175", carbs: 56784 }, { kcal: 12345, protein: 12345, fats: "a1969970175", carbs: 12 }, "kcal")
    })

    test("3", () => {
        equateFood.default({ kcal: 56784, protein: 12, fats: 987650, carbs: "bc23a9d531064583ace8f67dad60f6bb" }, { kcal: 12, protein: 987650, fats: 12345, carbs: 12345 }, "kcal")
    })

    test("4", () => {
        equateFood.default({ kcal: 56784, protein: 12345, fats: "a1969970175", carbs: 12 }, { kcal: 987650, protein: "bc23a9d531064583ace8f67dad60f6bb", fats: 12345, carbs: 987650 }, "kcal")
    })

    test("5", () => {
        equateFood.default({ kcal: 987650, protein: 56784, fats: 987650, carbs: 12 }, { kcal: 56784, protein: "a1969970175", fats: 12, carbs: "bc23a9d531064583ace8f67dad60f6bb" }, 23306)
    })

    test("6", () => {
        equateFood.default({ kcal: 12345, protein: 12, fats: "a1969970175", carbs: 12345 }, { kcal: 56784, protein: "bc23a9d531064583ace8f67dad60f6bb", fats: 987650, carbs: 12345 }, "kcal")
    })

    test("7", () => {
        equateFood.default({ kcal: Infinity, protein: Infinity, fats: Infinity, carbs: Infinity }, { kcal: Infinity, protein: Infinity, fats: Infinity, carbs: Infinity }, "")
    })

    test("8", () => {
        equateFood.default({ kcal: "", protein: -Infinity, fats: NaN, carbs: NaN }, { kcal: NaN, protein: Infinity, fats: Infinity, carbs: -Infinity }, undefined)
    })
})
