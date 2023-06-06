import './App.css';
import dice from "./dice.png";
import Card from "./Card.jsx";
import { useEffect, useState } from 'react';
import axios from 'axios';

function App() {

  const API_KEY = "95063c735a0e488cb23df8b7768c3166";
  const url = "https://newsapi.org/v2/everything?q=";

  const [getInput, setInput] = useState("");
  const [getNews, setNews] = useState([]);

  const handleSubmitBtn = (event) => {
    event.preventDefault();
    console.log(getInput);
    try {
      async function getData() {
        try {
          const response = await axios.get(`${url}${getInput}&apiKey=${API_KEY}`);
          const dataa = await response.data.articles;
          setNews(dataa);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    } catch (error) {
      console.log(error);
    }
    setInput("");
  }

  const handleOnChangeInput = (event) => {
    let inputData = event.target.value;
    setInput(inputData);
  }

  useEffect(() => {
    try {
      async function getData() {
        try {
          const response = await axios.get(`${url}India&apiKey=${API_KEY}`);
          const dataa = await response.data.articles;
          setNews(dataa);
        } catch (error) {
          console.log(error);
        }
      }
      getData();
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <div>

      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container-fluid main-nav container1 flex">
          <span className="navbar-brand" href="/" style={{ marginLeft: "10px", cursor: "pointer" }} onClick={()=>{
            window.location.reload();
            }}>
            <img className="company-logo" src={dice} alt="logo" />
            <p style={{ display: "inline", fontSize: "14px" }}>Dice News</p>
          </span>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <form className="d-flex search-bar flex" style={{ marginLeft: "10px" }} onSubmit={handleSubmitBtn}>
              <input className="form-control me-2 news-input" type="search" placeholder="e.g Elon Musk" value={getInput} onChange={handleOnChangeInput} />
              <button className="search-button" type="submit">Search</button>
            </form>
          </div>
        </div>
      </nav>

      {/* Original */}
      {/* <nav>
        <div className="main-nav container1 flex ">
          <a href="#">
            <img className="company-logo" src={dice} alt="logo" />
          </a>

          <div className="nav-links">
            <ul className='flex'>
              <li className="hover-link nav-item">Trending</li>
              <li className="hover-link nav-item">Tech</li>
              <li className="hover-link nav-item">Politics</li>
              <li className="hover-link nav-item">Economy</li>
            </ul>
          </div>

          <div className="search-bar flex">
            <input type="text" className="news-input" placeholder='e.g Dhoni' />
            <button className="search-button">Search</button>
          </div>
        </div>
      </nav> */}


      <div className="news-card container1 flex">
        <div className="container">
          <div className="row" style={{ marginBottom: "5px" }}>
            {
              getNews && getNews.map((currentElement,index) => {
                if (!currentElement.urlToImage) {
                  return;
                }else{
                  // Maximum length of the content you want to display
                  const maxContentLengthTitle = 60;
                  const slicedContentTitle = currentElement.title.slice(0, maxContentLengthTitle) + '...';

                  const maxContentLengthDesc = 80;
                  const slicedContentDesc = currentElement.description.slice(0, maxContentLengthDesc) + '...';

                  // Convert the ISO 8601 date string to a Date object
                  const dateString = currentElement.publishedAt;
                  const date = new Date(dateString);
                  const formattedDate = date.toLocaleDateString('en-US', {
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  });

                  return(

                    <div className="cardbody col-sm-6 col-md-4 col-lg-3 ml-2 mt-1 flex" onClick={()=>{
                        window.open(currentElement.url, "_blank");
                      }}>
                      <Card
                        key={index}
                        image={currentElement.urlToImage}
                        // heading={currentElement.title}
                        heading={slicedContentTitle}
                        publisher={currentElement.source.name}
                        date={formattedDate}
                        // desc={currentElement.description}
                        desc={slicedContentDesc}
                      />
                    </div>
                  
                  );
                }
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
