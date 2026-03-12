export interface FaqItem {
    panel: string;
    question: string;
    answer: string;
}

export const items: FaqItem[] = [
    { panel: "panel1", question: "Question 1", answer: "Answer 1" },
    { panel: "panel2", question: "Question 2", answer: "Answer 2" },
    { panel: "panel3", question: "Question 3", answer: "Answer 3" },
    { panel: "panel4", question: "Question 4", answer: "Answer 4" },
];
