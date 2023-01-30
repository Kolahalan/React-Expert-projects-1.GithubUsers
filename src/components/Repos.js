import React from "react";
import styled from "styled-components";
import { GithubContext } from "../context/context";
import { ExampleChart, Pie3D, Column3D, Bar3D, Doughnut2D } from "./Charts";
const Repos = () => {
  const { repos } = React.useContext(GithubContext);
  //console.log(repos);
  let languages = repos.reduce((total, item) => {
    const { language } = item;
    if (!language) {
      return total; //At times, the language field comes as null, at that time, we just return total
    }
    if (!total[language]) {
      total[language] = { label: language, value: 1 };
    } else {
      total[language] = {
        ...total[language],
        value: total[language].value + 1,
      };
    }
    return total;
  }, {});

  languages = Object.values(languages)
    .sort((a, b) => {
      //sorting array from highest to lowest with respect to value field type
      return b.value - a.value;
    })
    .slice(0, 5); //restricting the array ]to a length of 5

  const chartdata = [
    {
      label: "HTML",
      value: "13",
    },
    {
      label: "CSS",
      value: "27",
    },
    {
      label: "Javascript",
      value: "60",
    },
  ];
  return (
    <section className="section">
      <Wrapper className="section-center">
        {/* <ExampleChart data={chartdata} />; */}
        <Pie3D data={languages} />
      </Wrapper>
    </section>
  );
};

const Wrapper = styled.div`
  display: grid;
  justify-items: center;
  gap: 2rem;
  @media (min-width: 800px) {
    grid-template-columns: 1fr 1fr;
  }

  @media (min-width: 1200px) {
    grid-template-columns: 2fr 3fr;
  }

  div {
    width: 100% !important;
  }
  .fusioncharts-container {
    width: 100% !important;
  }
  svg {
    width: 100% !important;
    border-radius: var(--radius) !important;
  }
`;

export default Repos;