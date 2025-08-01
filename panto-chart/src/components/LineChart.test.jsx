import {render, screen} from "@testing-library/react";
import {LineChart} from './LineChart'
import React from "react";

describe("LineChart", () => {
    it("renders loading when no data", () => {
        render(<LineChart title="Loading Chart" data={null} />);
        expect(screen.getByText("Loading...")).toBeInTheDocument();
    });

    it("renders a single line for single-series", () => {
        const data = [[1, 5], [2, 10]];
        render(<LineChart data={data}/>);
        const paths = document.querySelectorAll("path.data-line");
        expect(paths.length).toBe(1);
    });

    it("renders multiple lines for multi-series", () => {
        const data = [[1, [5, null, 10]], [2, [6, 9, null]]];
        render(<LineChart data={data}/>);
        const paths = document.querySelectorAll("path.data-line");
        expect(paths.length).toBe(3);
    })
})