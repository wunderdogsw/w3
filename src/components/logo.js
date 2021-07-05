import React from "react"

import * as styles from "./logo.module.css"

const Logo = ({ inverse }) => (
  <svg
    className={`${styles.wrapper} ${inverse && styles.inverse}`}
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 222.603 211.957"
  >
    <path
      d="M959.844,24.727,943.247,1.5H934.3V39.945h8.947V15.84l16.976,23.906.14.2h8.448V1.5h-8.967Z"
      transform="translate(-747.706 -1.2)"
    />
    <path
      d="M82.678,433.5H67.4v38.445H82.658c12.183,0,20.371-7.709,20.371-19.193C103.049,441.249,94.861,433.5,82.678,433.5Zm11.244,19.253c0,6.591-4.633,11.184-11.244,11.184H76.367V441.509h6.311C89.608,441.509,93.922,445.822,93.922,452.753Z"
      transform="translate(-53.939 -346.924)"
    />
    <path
      d="M515.8,471.945h29.118v-7.889H524.747v-7.729H541.8V448.5H524.747v-7.15h20.171V433.5H515.8Z"
      transform="translate(-412.787 -346.924)"
    />
    <path
      d="M82.758,865.5H67.5v38.445H82.758c12.183,0,20.371-7.709,20.371-19.193C103.129,873.249,94.941,865.5,82.758,865.5ZM94,884.753c0,6.591-4.633,11.184-11.244,11.184H76.467V873.509h6.291C89.688,873.509,94,877.822,94,884.753Z"
      transform="translate(-54.019 -692.647)"
    />
    <path
      d="M527.463,22.049a8.2,8.2,0,0,1-8.188,8.208h-1.018a8.217,8.217,0,0,1-8.188-8.208V0H501.3V22.049a17,17,0,0,0,16.956,17h1.018a17,17,0,0,0,16.956-17V0h-8.767Z"
      transform="translate(-401.183)"
    />
    <path
      d="M509.792,862.5a19.812,19.812,0,1,0,19.692,19.812A19.77,19.77,0,0,0,509.792,862.5Zm10.545,19.832a10.552,10.552,0,1,1-10.545-10.944A10.766,10.766,0,0,1,520.337,882.332Z"
      transform="translate(-392.22 -690.246)"
    />
    <path
      d="M948.669,880.334v7.729h6.591A8.385,8.385,0,0,1,952.543,892a9.215,9.215,0,0,1-6.191,2.337,11.407,11.407,0,0,1-7.669-3.2,11.147,11.147,0,0,1-3.775-8.708,11.512,11.512,0,0,1,3.415-8.568,11.207,11.207,0,0,1,8.428-3.455,10.628,10.628,0,0,1,6.651,2.3,12.827,12.827,0,0,1,1.558,1.418l5.073-6.231a26.764,26.764,0,0,0-2.556-2.1,18.258,18.258,0,0,0-2.437-1.458,20.092,20.092,0,0,0-22.528,3.974,19.987,19.987,0,0,0-.1,28.08,18.715,18.715,0,0,0,13.78,5.812,17.5,17.5,0,0,0,13.641-6.051,16.613,16.613,0,0,0,3.4-5.852,25.954,25.954,0,0,0,1-7.489v-2.437H948.669Z"
      transform="translate(-741.624 -690.246)"
    />
    <path
      d="M62.571,1.4H53.524L45.595,26.424,36.588,1.4H26.123L18.194,26.424,9.187,1.4H0L13.88,39.905h9.107l8.548-27.021,9.726,27.021h9.127Z"
      transform="translate(0 -1.12)"
    />
    <path
      d="M943.929,460.222h7.989l8.348,11.623h9.686l-9.467-13.181a13.456,13.456,0,0,0-6.271-25.364H936.1v38.565h7.869V460.222Zm0-19.073h10.265a5.592,5.592,0,1,1,0,11.184H943.929Z"
      transform="translate(-749.147 -346.764)"
    />
  </svg>
)

export default Logo
