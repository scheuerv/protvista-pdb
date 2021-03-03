const { html } = require("lit-html");

function PDBePvVariationSection(ctx) {
    return html `<div class="protvistaRow pvVariantGraphRow" style="display:none">
                    
                    <div class="protvistaCol1 category-label" @click=${e => ctx.layoutHelper.showVariantPlot()}>Variants</div>

                    <div class="protvistaCol2 aggregate-track-content pvVariantGraphSection">
                        <protvista-pdb-variation-graph highlight-event="onmouseover" length="${ctx.viewerData.length}"></protvista-pdb-variation-graph>
                    </div>
                </div>

                <div class="pvVariantPlotRow" style="display:none">

                    <div class="protvistaRow">
                        
                        <div class="protvistaCol1 track-label">
                            <protvista-filter for="variation-graph"></protvista-filter>
                        </div>

                        <div class="protvistaCol2 track-content pvVariantPlotSection">
                            <protvista-pdb-variation id="variation-graph" highlight-event="onmouseover" length="${ctx.viewerData.length}"></protvista-pdb-variation>
                        </div>
                    </div>

                </div>`
        
}

export default PDBePvVariationSection;