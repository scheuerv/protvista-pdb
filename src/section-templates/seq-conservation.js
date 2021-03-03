const {html} = require("lit-html");

function PDBePvScSection(ctx) {
    return html`<div class="protvistaRow pvConsHistoRow" style="display:none">
                    
                    <div class="protvistaCol1 category-label" @click=${e => ctx.layoutHelper.showConservationPlot()} style="background-color:rgb(128,128,128); borderBottom:1px solid lightgrey">Sequence conservation</div>

                    <div class="protvistaCol2 aggregate-track-content pvConservationHistoSection">
                        <protvista-pdb-sc-histogram highlight-event="onmouseover" accession="${ctx._entryId ? ctx._entryId : ctx._accession}" length="${ctx.viewerData.length}"></protvista-pdb-sc-histogram>
                    </div>
                </div>
                <div class="pvConservationPlotRow" style="display:none">
                    <div class="protvistaRow">
                        <div class="protvistaCol1 track-label" style="background-color:rgb(211,211,211); borderBottom:1px solid lightgrey">
                            <div style="height:30px;">
                                <b>Amino acid probabilities</b>
                                <span style="float: right" @mouseover=${e => {
                                    e.stopPropagation();
                                    ctx.layoutHelper.showLabelTooltip(e)
                                    }} @mouseout=${e => {
                                    e.stopPropagation();
                                    ctx.layoutHelper.hideLabelTooltip()
                                }}>
                                    <a href="https://github.com/PDBe-KB/pdbe-kb-manual/wiki/Sequence-conservation-scores" target="_blank"
                                    style="border-bottom: none">
                                        <i class="icon icon-generic" data-icon="?"></i>
                                    </a>
                                    <span class="labelTooltipContent" style="display:none;">
                                        The amino acid probabilities are calculated using HMM profiles based on multiple sequence alignments. Click to see more details...
                                    </span>
                                </span>
                            </div>
                            <div class="control" style="height:90px;">
                                <p>Data displayed by</p>
                                <div>
                                    <label class="legendText">
                                        <input type="radio" class="sc_radio" name="sc_display_radio" value="property" checked @change=${e => ctx.layoutHelper.filterSc('property')}>Property
                                    </label>
                                </div>
                                <div>
                                    <label class="legendText">
                                        <input type="radio" class="sc_radio" name="sc_display_radio" value="probability" @change=${e => ctx.layoutHelper.filterSc('probability')}>Probability
                                    </label>
                                </div>
                            </div>

                            <!-- Note: Display is set to none until we expose MSA files per PDB entity -->
                            <div @mouseover=${e => {
                                e.stopPropagation();
                                ctx.layoutHelper.showLabelTooltip(e)
                                }} @mouseout=${e => {
                                e.stopPropagation();
                                ctx.layoutHelper.hideLabelTooltip()
                            }}
                            style = "${ctx._entryId ? "display: none" : ""}"
                            >
                                <a class="button" style="padding: 2px 4px 2px 4px; background-color: #ececec; border: solid 1px dimgrey; border-radius: 3px"
                                    href="${ctx.layoutHelper.getMSADownloadUrl()}">
                                    Download MSA <i class="icon icon-functional" data-icon="="></i>
                                </a>
                                <span class="labelTooltipContent" style="display:none;">
                                    Click to download the multiple sequence alignment (MSA) file
                                </span>
                            </div>

                            <div class="legend" style="height:200px;">
                                <p>Amino acid properties</p>
                                <div class="protvista-sc-legend">
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#15a4a4"></span>
                                        <span class="legendText">Aromatic</span>
                                    </div>
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#15c015"></span>
                                        <span class="legendText">Polar</span>
                                    </div>
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#80a0f0"></span>
                                        <span class="legendText">Hydrophobic</span>
                                    </div>
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#c048c0"></span>
                                        <span class="legendText">Negative charge</span>
                                    </div>
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#c0c000"></span>
                                        <span class="legendText">Proline</span>
                                    </div>
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#f01505"></span>
                                        <span class="legendText">Positive charge</span>
                                    </div>
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#f08080"></span>
                                        <span class="legendText">Cysteine</span>
                                    </div>                                  
                                    <div class="protvista-sc-legend">
                                        <span class="legendColor" style="background:#f09048"></span>
                                        <span class="legendText">Glycine</span>
                                    </div>
                                </div>
                            </div>

                            <div class="download-sc-align">
                            </div>
                        </div>

                        <div class="protvistaCol2 track-content pvConservationPlotSection">
                            <protvista-pdb-seq-consevation highlight-event="onmouseover" accession="${ctx._entryId ? ctx._entryId : ctx._accession}" length="${ctx.viewerData.length}"></protvista-pdb-seq-consevation>
                        </div>
                    </div>
                </div>`

}

export default PDBePvScSection;