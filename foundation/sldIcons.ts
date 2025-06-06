import { html, svg, TemplateResult } from 'lit';
import { EqType, eqTypes, isEqType } from './sldUtil.js';

const pathsSVG = {
  gooseIcon: svg`<path fill="currentColor" d="M11,7H15V9H11V15H13V11H15V15A2,2 0 0,1 13,17H11A2,2 0 0,1 9,15V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />`,
  reportIcon: svg`<path fill="currentColor" d="M9,7H13A2,2 0 0,1 15,9V11C15,11.84 14.5,12.55 13.76,12.85L15,17H13L11.8,13H11V17H9V7M11,9V11H13V9H11M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12C4,16.41 7.58,20 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />`,
  smvIcon: svg`<path fill="currentColor" d="M11,7H15V9H11V11H13A2,2 0 0,1 15,13V15A2,2 0 0,1 13,17H9V15H13V13H11A2,2 0 0,1 9,11V9A2,2 0 0,1 11,7M12,2A10,10 0 0,1 22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2M12,4A8,8 0 0,0 4,12A8,8 0 0,0 12,20A8,8 0 0,0 20,12A8,8 0 0,0 12,4Z" />`,
  publisher: svg`<polygon points="0,8 12,0 24,8 12,6" />`,
  input: svg`<polygon points="0,24 12,17 21,24 12,22" />`,

  reportPure: svg`<path d="m 9,7 v 10 h 2 v -4 h 0.800781 L 13,17 h 2 L 13.755859,12.851563 C 14.485673,12.5534 15,11.837078 15,11 V 9 C 15,7.8954305 14.104569,7 13,7 Z m 2,2 h 2 v 2 h -2 z">`,
};

export const gooseIcon = svg`<svg viewBox="0 0 24 24">${pathsSVG.gooseIcon}</svg>`;

export const reportIcon = svg`<svg viewBox="0 0 24 24">${pathsSVG.reportIcon}</svg>`;

export const smvIcon = svg`<svg viewBox="0 0 24 24">${pathsSVG.smvIcon}</svg>`;

export const goosePublisher = svg`<svg viewBox="0 0 24 24">${pathsSVG.gooseIcon}</svg>`;
export const reportPublisher = svg`<svg viewBox="0 0 24 24">${pathsSVG.reportIcon}</svg>`;
export const smvPublisher = svg`<svg viewBox="0 0 24 24">${pathsSVG.smvIcon}</svg>`;

export const gooseInput = svg`<svg viewBox="0 0 24 24">${pathsSVG.gooseIcon}</svg>`;
export const reportInput = svg`<svg viewBox="0 0 24 24">${pathsSVG.reportIcon}</svg>`;
export const smvInput = svg`<svg viewBox="0 0 24 24">${pathsSVG.smvIcon}</svg>`;

export const resizePath = svg`<path
  d="M120 616v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm160 0v-80h80v80h-80Zm160 640v-80h80v80h-80Zm0-640v-80h80v80h-80Zm160 640v-80h80v80h-80Zm160 0v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160v-80h80v80h-80Zm0-160V296H600v-80h240v240h-80ZM120 936V696h80v160h160v80H120Z"
/>`;

export const resizeTLPath = svg`<path
  d="m 120,616 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 320,0 H 600 V 216 H 840 Z M 120,936 V 696 h 80 v 160 z" /> `;

export const resizeBRPath = svg`<path
  d="m 440,936 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 V 296 l 80,-80 v 240 z m -640,480 80,-80 h 160 v 80 z" />`;

// TODO: remove alt icons if unneeded
export const resizeTLPathAlt = svg`<path
  d="m 120,616 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z M 760,936 V 296 H 600 v -80 h 240 v 720 z m -640,0 V 696 h 80 v 160 h 560 v 80 z" /> `;

export const resizeBRPathAlt = svg`<path
  d="m 440,936 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 V 296 H 200 V 216 H 840 V 456 Z M 120,936 V 216 h 80 v 640 h 160 v 80 z" />`;

export const resizeTLPathAlt2 = svg`<path
  d="m 120,616 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z M 760,456 V 296 H 600 V 216 H 840 V 456 Z M 120,936 V 696 h 80 v 160 h 160 v 80 z" /> `;

export const resizeBRPathAlt2 = svg`<path
  d="m 440,936 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 160,0 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 v -80 h 80 v 80 z m 0,-160 V 296 H 600 V 216 H 840 V 456 Z M 120,936 V 696 h 80 v 160 h 160 v 80 z" />`;

export const movePath = svg`<path d="M480 976 310 806l57-57 73 73V616l-205-1 73 73-58 58L80 576l169-169 57 57-72 72h206V330l-73 73-57-57 170-170 170 170-57 57-73-73v206l205 1-73-73 58-58 170 170-170 170-57-57 73-73H520l-1 205 73-73 58 58-170 170Z"/>`;

export const inputCirclePath = svg`<path
  d="M480-640 280-440l56 56 104-103v407h80v-407l104 103 56-56-200-200ZM146-260q-32-49-49-105T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 59-17 115t-49 105l-58-58q22-37 33-78t11-84q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 43 11 84t33 78l-58 58Z"/>`;

export const outputCirclePath = svg`<path
  d="M480-80 280-280l56-56 104 103v-407h80v407l104-103 56 56L480-80ZM146-260q-32-49-49-105T80-480q0-83 31.5-156T197-763q54-54 127-85.5T480-880q83 0 156 31.5T763-763q54 54 85.5 127T880-480q0 59-17 115t-49 105l-58-58q22-37 33-78t11-84q0-134-93-227t-227-93q-134 0-227 93t-93 227q0 43 11 84t33 78l-58 58Z"/>`;

export const switchAddPath = svg`<path
  d="M720-320v-80h-80v-80h80v-80h80v80h80v80h-80v80h-80ZM600-80q-127-48-203.5-158T320-484q0-91 36-172.5T458-800H320v-80h280v280h-80v-148q-57 51-88.5 119.5T400-484q0 102 54 187.5T600-167v87Z"/>`;

export const listAddPath = svg`<path d="M680-40v-120H560v-80h120v-120h80v120h120v80H760v120h-80ZM200-200v-560 560Zm0 80q-33 0-56.5-23.5T120-200v-560q0-33 23.5-56.5T200-840h560q33 0 56.5 23.5T840-760v353q-18-11-38-18t-42-11v-324H200v560h280q0 21 3 41t10 39H200Zm120-160q17 0 28.5-11.5T360-320q0-17-11.5-28.5T320-360q-17 0-28.5 11.5T280-320q0 17 11.5 28.5T320-280Zm0-160q17 0 28.5-11.5T360-480q0-17-11.5-28.5T320-520q-17 0-28.5 11.5T280-480q0 17 11.5 28.5T320-440Zm0-160q17 0 28.5-11.5T360-640q0-17-11.5-28.5T320-680q-17 0-28.5 11.5T280-640q0 17 11.5 28.5T320-600Zm120 160h240v-80H440v80Zm0-160h240v-80H440v80Zm0 320h54q8-23 20-43t28-37H440v80Z"/>`;

const voltageLevelPath = svg`<path
    d="M 4 4 L 12.5 21 L 21 4"
    fill="none"
    stroke="currentColor"
    stroke-width="3"
    stroke-linejoin="round"
    stroke-linecap="round"
  />`;

const bayPath = svg`<path
    d="M 3 2 L 22 2"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 3 5 L 22 5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 7 2 L 7 7.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 18 5 L 18 7.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 5.5 8.5 L 7 11 L 7 13 L 18 13 L 18 11 L 16.5 8.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 12.5 13 L 12.5 15"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 11 16 L 12.5 18.5 L 12.5 23"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="M 10.5 21 L 12.5 23 L 14.5 21"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />`;

const zigPath = svg`
  <line x1="1.5" y1="1.5" x2="1.5" y2="1.25" />
  <line transform="rotate(240 1.5 1.25)" x1="1.5" y1="1.5" x2="1.5" y2="1.25" />
`;

export const zigZagPath = svg`
<g>${zigPath}</g>
<g transform="rotate(120 1.5 1.5)">${zigPath}</g>
<g transform="rotate(240 1.5 1.5)">${zigPath}</g>
`;

export const zigZag2WTransform =
  'matrix(0.8, 0, 0, 0.8, 0.3, 0.3) translate(0 -0.1) rotate(-20 1.5 1.5)';

export const voltageLevelIcon = html`<svg
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="icon"
>
  ${voltageLevelPath}
</svg>`;

export const voltageLevelGraphic = html`<svg
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="graphic"
>
  ${voltageLevelPath}
</svg>`;

export const bayIcon = html`<svg
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="icon"
>
  ${bayPath}
</svg>`;

export const bayGraphic = html`<svg
  viewBox="0 0 25 25"
  width="24"
  height="24"
  slot="graphic"
>
  ${bayPath}
</svg>`;

const equipmentPaths: Record<EqType, TemplateResult<2>> = {
  CAB: svg`
  <path
    d="M 9.4,4.2 H 15.6 L 12.5,8.3 Z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="m 12.5,8.3 v 9"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="m 9.4,21.3 h 6.2 l -3.1,-4.1 z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  `,
  CAP: svg`
  <path
    d="M 6.5,10.1 H 18.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="M 12.5,4 V 10.1"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="M 6.5,14.9 H 18.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="M 12.5,14.9 V 21"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  `,
  CBR: svg`
  <line
    x1="12.5"
    y1="21"
    x2="4"
    y2="5"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="9.5"
    y1="1"
    x2="15.5"
    y2="7"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="9.5"
    y1="7"
    x2="15.5"
    y2="1"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
  CTR: svg`
  <line
    x1="12.5"
    y1="4"
    x2="12.5"
    y2="21"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <circle
    cx="12.5"
    cy="12.5"
    r="7.5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
  DIS: svg`
  <path
    d="M 12.5 21 L 4 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 8 4 L 17 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
  GEN: svg`
  <path
    d="m 16.2,12.5 v 4.2 q -0.2,0.2 -0.6,0.6 -0.4,0.4 -1.1,0.7 -0.7,0.3 -1.8,0.3 -1.8,0 -2.9,-1.2 -1.1,-1.2 -1.1,-3.6 v -2.1 q 0,-2.4 1,-3.6 1,-1.1 2.9,-1.1 1.7,0 2.6,0.9 0.9,0.9 1,2.6 h -1.4 q -0.1,-1.1 -0.6,-1.6 -0.5,-0.6 -1.5,-0.6 -1.3,0 -1.8,0.9 -0.5,0.9 -0.5,2.6 v 2.1 q 0,1.8 0.7,2.7 0.7,0.9 1.9,0.9 1,0 1.4,-0.3 0.4,-0.3 0.6,-0.5 v -2.6 h -2.1 v -1.2 z"
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0.3"
    stroke-linecap="round"
  />
  `,
  IFL: svg`
  <polygon
    points="4,4 12.5,21 21,4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  `,
  LIN: svg`
  <path
    d="M 12.5,4 V 21"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="m 10.3,12.5 4.3,-2.5"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="m 10.3,15 4.3,-2.5"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
  MOT: svg`
  <path
    d="m 12.5,15.5 2.3,-7.8 h 1.4 v 9.6 h -1.1 v -3.7 l 0.1,-3.7 -2.3,7.4 h -0.9 L 9.8,9.8 9.9,13.6 v 3.7 H 8.8 V 7.7 h 1.4 z"
    stroke="currentColor"
    fill="currentColor"
    stroke-width="0.3"
    stroke-linecap="round"
  />
  `,
  REA: svg`
  <path
    d="m 4.5,12.5 h 8 V 4"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="m 4.5,12.5 a 8,8 0 0 1 8,-8 8,8 0 0 1 8,8 8,8 0 0 1 -8,8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 12.5,20.5 V 21"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
  RES: svg`
  <rect
    y="4"
    x="8.5"
    height="17"
    width="8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
  SAR: svg`
  <path
    d="M 12.5,4 V 8"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
    />
  <path
    d="m 12.5,21 v 4"
    fill="none"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <line
    x1="10"
    y1="24.25"
    x2="15"
    y2="24.25"
    stroke="currentColor"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <path
    d="M 11.2,8 12.5,11 13.8,8 Z"
    fill="currentColor"
    stroke="currentColor"
    stroke-width="1"
    stroke-linecap="round"
  />
  <rect
    y="4"
    x="8.5"
    height="17"
    width="8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `,
  SMC: svg`
  <path
    d="m 16.6,12.5 c -0.7,1.4 -1.3,2.8 -2.1,2.8 -1.5,0 -2.6,-5.6 -4.1,-5.6 -0.7,0 -1.4,1.4 -2.1,2.8"
    stroke="currentColor"
    fill="none"
    stroke-width="1.2"
    stroke-linecap="round"
  />
  `,
  VTR: svg`
  <circle
    cx="12.5"
    cy="9.5"
    r="5.25"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  <circle
    cx="12.5"
    cy="15.5"
    r="5.25"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
`,
};

export const eqRingPath = svg`
  <circle
    cx="12.5"
    cy="12.5"
    r="8.5"
    stroke="currentColor"
    fill="none"
    stroke-width="1.5"
    stroke-linecap="round"
  />
  `;

const defaultEquipmentPath = svg`
  <circle
    cx="12.5"
    cy="12.5"
    r="11"
    stroke-width="1.5"
    stroke="currentColor"
    fill="none"
  />
  <path
    d=" M 7.5 17.5
    L 12 13
    Z"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d="	M 11 7
      L 10 8
      C 5 13, 11 20, 17 15
      L 18 14
      Z"
    fill="currentColor"
    stroke="currentColor"
    stroke-linejoin="round"
  />
  <path
    d=" M 13 9
    L 16 6
    Z"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
  <path
    d=" M 16 12
    L 19 9
    Z"
    fill="none"
    stroke="currentColor"
    stroke-width="2"
    stroke-linejoin="round"
    stroke-linecap="round"
  />
`;

export function equipmentPath(equipmentType: string | null): TemplateResult<2> {
  if (equipmentType && isEqType(equipmentType))
    return equipmentPaths[equipmentType]!;
  return defaultEquipmentPath;
}

function equipmentSymbol(equipmentType: string): TemplateResult<2> {
  return svg`<symbol
    id="${equipmentType}"
    viewBox="0 0 25 25"
    width="1" height="1"
  >
    ${equipmentPath(equipmentType)}
  </symbol>`;
}

function iedSymbol(): TemplateResult<2> {
  return svg`<symbol
    id="IED"
    viewBox="0 0 25 25"
    width="1" height="1"
  >
  <path
    fill="currentColor"
    d="M22 9V7h-2V5a2 2 0 0 0-2-2H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-2h2v-2h-2v-2h2v-2h-2V9zm-4 10H4V5h14zM6 13h5v4H6zm6-6h4v3h-4zM6 7h5v5H6zm6 4h4v6h-4z"
  />
  </symbol>`;
}

const groundedMarker = svg`<marker
  markerWidth="20" markerHeight="20"
  refX="12.5" refY="12.5"
  viewBox="0 0 25 25"
  id="grounded"
  orient="auto-start-reverse"
>
  <line
    y1="17"
    y2="8"
    x1="12.5"
    x2="12.5"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="1.5"
  />
  <line
    y1="15.5"
    y2="9.5"
    x1="14.7"
    x2="14.7"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="1.5"
  />
  <line
    y1="14.5"
    y2="10.5"
    x1="16.8"
    x2="16.8"
    stroke="currentColor"
    stroke-linecap="round"
    stroke-width="1.5"
  />
</marker>`;

const arrowMarker = svg`
<marker
  id="arrow"
  viewBox="0 0 10 10"
  refX="5"
  refY="5"
  markerWidth="6"
  markerHeight="6"
  orient="auto-start-reverse">
  <path d="M 0 0 L 10 5 L 0 10 z" fill="currentColor" />
</marker>
`;

export const symbols = svg`
  <defs>
  <pattern id="halfgrid" patternUnits="userSpaceOnUse" width="1" height="1" viewBox="0 0 1 1">
  <circle cx="0.1" cy="0.25" r="0.035" fill="#888" opacity="0.3" />
  <circle cx="0.6" cy="0.25" r="0.035" fill="#888" opacity="0.3" />
  <circle cx="0.1" cy="0.75" r="0.035" fill="#888" opacity="0.3" />
  <circle cx="0.6" cy="0.75" r="0.035" fill="#888" opacity="0.3" />
  </pattern>
  <pattern id="grid" patternUnits="userSpaceOnUse" width="1" height="1" viewBox="0 0 1 1">
  <line x1="0" y1="0" x2="0" y2="1" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  <line x1="0" y1="0" x2="1" y2="0" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  <line x1="1" y1="0" x2="1" y2="1" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  <line x1="0" y1="1" x2="1" y2="1" stroke="#888" stroke-opacity="0.3" stroke-width="0.06" />
  </pattern>
  ${eqTypes.map(eqType => equipmentSymbol(eqType))}
  ${equipmentSymbol('ConductingEquipment')}
  ${iedSymbol()}
  ${groundedMarker}
  ${arrowMarker}
  </defs>
`;
