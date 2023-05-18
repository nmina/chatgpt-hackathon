import {useEffect, useRef} from "react";
import './results-section.css';

function ResultsSection({data}) {
  console.log("printing:", data);
  const divRef = useRef(null);
  
  useEffect(() => {
    if (divRef.current) {
      divRef.current.innerHTML = data;
    }
  }, [divRef, data]);
  
  return (<div id="resultsSection" ref={divRef}></div>)
}

export default ResultsSection;
