import { createSvgIcon } from "@mui/material/utils";

// export const Order = createSvgIcon(
//   <svg
//     xmlns="http://www.w3.org/2000/svg"
//     viewBox="0 0 20 20"
//     fill="currentColor"
//   >
//     <rect width="20" height="20" fill="currentColor"/>
//     <rect x="0.6" y="0.6" width="18.8" height="18.8" fill="currentColor" stroke="#fff" strokeWidth="1.2"/>
//     <path d="M5 6H9.84848H15" stroke="black" strokeWidth="1.2"/>
//     <line x1="5" y1="10.4" x2="15" y2="10.4" stroke="black" strokeWidth="1.2"/>
//     <line x1="5" y1="14.4" x2="15" y2="14.4" stroke="black" strokeWidth="1.2"/>
//   </svg>,
//   'Order'
// );

export const Order = createSvgIcon(
  <svg
    viewBox="0 0 20 20"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
  >
    {/* <rect width="75" height="62" fill="#F9ECEC" /> */}
    <path
      d="M61.9393 61.0607C62.5251 61.6465 63.4749 61.6465 64.0607 61.0607L73.6066 51.5147C74.1924 50.9289 74.1924 49.9792 73.6066 49.3934C73.0208 48.8076 72.0711 48.8076 71.4853 49.3934L63 57.8787L54.5147 49.3934C53.9289 48.8076 52.9792 48.8076 52.3934 49.3934C51.8076 49.9792 51.8076 50.9289 52.3934 51.5147L61.9393 61.0607ZM61.5 6.50713e-10L61.5 60L64.5 60L64.5 -6.50713e-10L61.5 6.50713e-10Z"
      fill="black"
    />
    <line y1="2.5" x2="51" y2="2.5" stroke="black" strokeWidth="3" />
    <line y1="17.5" x2="51" y2="17.5" stroke="black" strokeWidth="3" />
    <path d="M0 32H51" stroke="black" stroke-width="3" />
    <line y1="45.5" x2="43" y2="45.5" stroke="black" strokeWidth="3" />
    <line y1="58.5" x2="43" y2="58.5" stroke="black" strokeWidth="3" />
  </svg>,
  "Order"
);
