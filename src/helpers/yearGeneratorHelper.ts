
export function generateYears(from: number, selectElement: HTMLSelectElement, defaultYear: null | number): void {
    for(let i = 1960; i <= 2025; i++) {
        const singleYear = document.createElement("option");
        singleYear.value = i.toString();
        singleYear.textContent = i.toString();

        if(i === defaultYear) {
            singleYear.selected = true;
        }

        selectElement.append(singleYear);
    }
}