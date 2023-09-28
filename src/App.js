import { Fragment, useEffect, useState } from "react";
import axios from "axios";
import "./styles.css";

export default function App() {
  const [facts, setFacts] = useState({
    data: [],
    links: []
  });

  useEffect(() => {
    axios.get("https://catfact.ninja/facts").then((res) => setFacts(res.data));
  }, []);

  const nextpagehandler = (link) => {
    axios.get(link.url).then((res) => setFacts(res.data));
  };

  return (
    <div className="App">
      <h1>Cat Facts with react</h1>
      <ul>
        {facts.data.map((fact, index) => (
          <Fact key={index} fact={fact} />
        ))}
      </ul>
      <div className="pagination">
        {facts.links.map((link, index) => (
          <PageButton key={index} link={link} handler={nextpagehandler} />
        ))}
      </div>
    </div>
  );
}

const Fact = ({ fact }) => {
  return <li className="fact-li"> {fact.fact}</li>;
};

const PageButton = ({ link, handler, currentPage }) => {
  if (!link.url) return <Fragment></Fragment>;

  return (
    <span
      className={`page-button ${link.active ? "active" : ""}`}
      onClick={handler(link)}
    >
      {" "}
      {link.label}{" "}
    </span>
  );
};
