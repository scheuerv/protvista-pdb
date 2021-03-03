import ProtvistaPdbTrack from "./pdb-track";
import {listenForTooltips} from "./tooltip";
import { scaleLinear } from "d3";

class ProtvistaPdbSeqConservation extends ProtvistaPdbTrack {

    constructor() {
        super();
    }

    connectedCallback() {
        super.connectedCallback();
        this._accession = this.getAttribute("accession");

        this._data = undefined;

        this._height = parseInt(this.getAttribute("height")) || 430;

        document.addEventListener("sc-change", (e) => {
            this.filterData(e.detail.type);
        });

    }

    set data(data) {
        this._data = (this._accession && this._accession !== 'null') ? data[this._accession]['data'] : data;
        this._createTrack();
    }



    _createFeatures() {
        // scale for Amino Acids
        this._yScale = scaleLinear()
            .domain([0, 1])
            .range([0, 400]);

        this._data.forEach(residue => {
            let y = 20;
            residue.amino.forEach(aa => {
                aa.ypos = y;
                y += this._yScale(aa.probability);

            })
        });
        listenForTooltips(this);
    }

    refresh() {
        if (this.xScale && this.seq_g) {

            this.svg.selectAll("foreignObject").remove();
            this.seq_g.selectAll("g.location-group").remove();

            if (this.getSingleBaseWidth() < 9.40) {

                this.foreign = this.svg
                    .append("foreignObject")
                    .attr("width", '100%')
                    .attr("height", this._height);

                this.commentdiv = this.foreign
                    .append("xhtml:div")
                    .attr("class", "zoomout")
                    .attr("style", "text-align: center; height: " + this._height + "px");

                this.span = this.commentdiv
                    .append("span")
                    .attr("style", "line-height:" + this._height + "px");

                this.span
                    .append("i")
                    .attr("class", "icon icon-functional")
                    .attr("data-icon", "3");
                this.span
                    .append("text")
                    .text("Please zoom in (until 150 or fewer residues are shown) to see the probabilities")

            } else {
                this.featuresG = this.seq_g.selectAll("g.location-group").data(this._data);
                this.svg
                    .attr("height", this._height);
                // create residue group
                this.locations = this.featuresG
                    .enter()
                    .filter(d => d.start > this._displaystart - 3 && d.start < this._displayend + 3)
                    .append("g")
                    .attr("class", "location-group")
                    .attr("height", this._height);

                // create aa group and rectangle shape depending on probability score
                this.aminorect = this.locations.selectAll(".aminogroup")
                    .data(d => d.amino)
                    .enter()
                    .filter(d => d.probability > 0)
                    .append("g")
                    .attr("class", "aminogroup")
                    .append("rect")
                    .attr("class", "rectamino")
                    .style("fill", d => d.color)
                    .attr("y", d => d.ypos)
                    .attr("height", d => this._yScale(d.probability))
                    .attr("width", this.getSingleBaseWidth())
                    .style("stroke-width", "0.5")
                    .style("stroke", "rgb(211,211,211)")
                    .attr("x", d => this.getXFromSeqPosition(d.start));

                // add text with AA letter to rectangle
                this.locations.selectAll(".aminogroup")
                    .append("text")
                    .attr("class", "textamino")
                    .attr("y", d => d.ypos + (this._yScale(d.probability) / 2 + 5))
                    .attr("color", "black")
                    .text(d => d.oneLetterCode)
                    .attr("text-anchor", "middle")
                    .attr("x", d => this.getXFromSeqPosition(d.start) + this.getSingleBaseWidth() / 2)
                    .attr("font-size", d => this.adaptLabelFontSize(this.getSingleBaseWidth(), this._yScale(d.probability)));



                // add tooltip
                this.aminorect
                    .attr("tooltip-trigger", "true")
                    .on("mouseover", (f, i, group) => {
                        this.dispatchEvent(
                            this.createEvent(
                            "mouseover",
                             {
                                ...f,
                                type: "Amino acid probability"
                            },
                            this._highlightEvent === "onmouseover",
                            false,
                            f.start,
                            f.end,
                            group[i]
                          )
                        );
                      })
                      .on("mouseout", () => {
                        this.dispatchEvent(
                            this.createEvent(
                            "mouseout",
                            null,
                            this._highlightEvent === "onmouseover"
                          )
                        );
                      })
                    .on("click", (f, i, group) => {
                        this.dispatchEvent(
                            this.createEvent(
                            "click",
                            {
                                ...f,
                                type: "Amino acid probability"
                            },
                            this._highlightEvent === "onclick",
                            true,
                            f.start,
                            f.end,
                            group[i]
                          )
                        );
                    });
            }

            this._updateHighlight();
        }
    }

    adaptLabelFontSize(rectwidth, rectheight) {
        const letterWidth = 9.40;

        // There is not enough space for the label so don't show it
        if (letterWidth > rectwidth || letterWidth > rectheight) {
            return 0 + 'em';
        }

        return 10 + 'px';
    }

    filterData(type) {
        if (type == 'probability') {
            this._data.forEach(residue => {
                residue.amino = residue.amino.sort(function(first, second) {
                    return second.probability - first.probability;
                });
            })
        } else {
            this._data.forEach(residue => {
                residue.amino = residue.amino.sort(function(first, second) {
                    return first.color.localeCompare(second.color);
                });
            })
        }
        this._createFeatures()
        this.refresh();
    }

    disconnectedCallback() {
        super.disconnectedCallback();
        if (this.manager) {
            this.manager.unregister(this);
        }
        document.removeEventListener("sc-change");
    }
}
export default ProtvistaPdbSeqConservation;