
export function listenForTooltips(self) {


    d3.select(self)
      .on("change", (f, i) => {
        const e = d3.event;
        const oldToolip = document.querySelectorAll("protvista-tooltip");
        switch (e.detail.eventtype) {
          case "mouseover":
            if (oldToolip && oldToolip[0] && oldToolip[0].className == 'click-open') {
            } else {
                createTooltip(e, e.detail, i);
            }
            break;
          case "click":
                createTooltip(e, e.detail, i, true);
            break;
          case "mouseout":
            if (oldToolip && oldToolip[0] && oldToolip[0].className == 'click-open') {
            } else {
                removeAllTooltips();
            }
            break;
        }

      });
  }
  export function removeAllTooltips() {
    d3.selectAll("protvista-tooltip").remove();
  }

 function createTooltip(e, d, i, closeable = false) {

    removeAllTooltips();
    const tooltip = document.createElement("protvista-tooltip");

    tooltip.left = d.coords[0] + 15;
    tooltip.top = d.coords[1] + 5;
    tooltip.style.marginLeft = 0;
    tooltip.style.marginTop = 0;

   var fragment;
    if (d.feature.locations) {
      fragment = d.feature.locations[0].fragments[i]; 
      }
    else {
      fragment = d.feature;
    }
    if(d.feature.type)
    {
        tooltip.title = `${d.feature.type}`;
    }
    tooltip.title += ` ${fragment.start}-${fragment.end}`
    if (fragment.start == fragment.end) tooltip.title = ` residue ${fragment.start}`;
    tooltip.closeable = closeable;

    // Passing the content as a property as it can contain HTML
    tooltip.content = fragment.tooltipContent;
    if (d.tooltipContent) tooltip.content = d.tooltipContent;
    if (closeable) tooltip.classList.add("click-open");
    document.body.appendChild(tooltip);

    const toolTipEl = d3.select(tooltip).node();
    const tooltipDom = toolTipEl.getBoundingClientRect();
    const bottomSpace = window.innerHeight - e.clientY;
    const rightSpace = window.innerWidth - e.clientX;

    if (bottomSpace < 130) {
      toolTipEl.style.top = d.coords[1] - (tooltipDom.height + 20) + 'px';
    }

    if (rightSpace < 300) {
      toolTipEl.style.left = '';
      toolTipEl.style.right = (rightSpace - 10) + 'px';
    }
  }
