import React, {useState, useEffect, useRef} from 'react'
import '../styles/CodeArena.css'
import CodeEditor from './CodeEditor'
import axios from 'axios';
import CodeMirror from 'codemirror';
import { useLocation } from "react-router-dom";
import toast, { Toaster } from 'react-hot-toast';
import ArenaCreateForm from './ArenaCreateForm';

import {useParams} from 'react-router-dom';


// import Confetti from 'react-confetti'

export default function CodeArena() {

  const [html, setHtml] = useState(` <html>
    <body>
        <div class="main"></div>
        <style>
            body {
                margin: 0;
                width: 400px;
                height: 300px;
                overflow: hidden;
            }
            .main {
                width: 100px;
                height: 100px;
                background-color: #F3AC3C;
            }
        </style>
    </body>
</html>`)
  const [srcDoc, setSrcDoc] = useState('')
  const [score, setScore] = useState('0')
  const [colors, setColors] = useState([])
  const [userImageUrl, setUserImageUrl] = useState('')
  const [slider, setSlider] = useState(true)
  const [showForm, setShowForm] = useState(false)
  // const [arenaData, setArenaData] = useState()

  // const location = useLocation();

  // const arenaData = location.state
  const params = useParams();
  
  const arenaData = {url: `https://cssbattle.dev/targets/${params.id}@2x.png`}

  useEffect(() => {
    const timeout = setTimeout(() => {
      setSrcDoc(`
        <html>
          <body>${html}</body>
        </html>
      `)
    }, 250)
    
    return () => clearTimeout(timeout)
  }, [html])

  useEffect(() => {

    document.querySelector('.live_view_container').style.transform = 'translateY(0px)'
    document.querySelector('.live_view_container').style.opacity = '1'
    document.querySelector('.problem_img_container').style.transform = 'translateY(0px)'
    document.querySelector('.problem_img_container').style.opacity = '1'

    let requestColorData = new FormData();
    /* const initialSLicedId = arenaData.url.slice(30)
    const finalSLicedId = initialSLicedId.slice(0, -7)
    data.append('id', finalSLicedId); */
    requestColorData.append('id', params.id);
    let requestColors = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/colors/',
      data : requestColorData
    };
    axios.request(requestColors)
    .then((response) => {
      setColors(response.data);
    })
    .catch((error) => {
      console.log(error);
    });

   /*  let requestProbImgData = new FormData();
    requestProbImgData.append('id', params.id);
    let requestProbImg = {
      method: 'post',
      maxBodyLength: Infinity,
      url: 'http://127.0.0.1:8000/api/problemImg/',
      data : requestProbImgData
    };
    axios.request(requestProbImg)
    .then((response) => {
      setColors(response.data);
    })
    .catch((error) => {
      console.log(error);
    }); */

    let CodeMirror_wrap = document.querySelector('.CodeMirror')
    CodeMirror_wrap.style.height = '100%'

    const sliderImage = document.createElement('div')
    sliderImage.classList.add('slider_image')
    sliderImage.style.backgroundImage = `url(${arenaData.url})`
    document.querySelector('.live_view_container').appendChild(sliderImage)

  }, [])

  async function createImage() {
    const payload = { html: html};
  
    let headers = { auth: {
      username: '20a59766-523b-447a-9390-f4532b880873',
      password: '4e96f97d-eeed-4848-860e-9033417b2df9'
    },
    headers: {
      'Content-Type': 'application/json'
    }
    }
    try {
      const response = await axios.post('https://hcti.io/v1/image', JSON.stringify(payload), headers);
      console.log(response.data.url);
      setUserImageUrl(response.data.url)
      imageUrl = response.data.url;

    } catch (error) {
      console.error(error);
    }
  }

  let imageUrl = ''

  /* async function createImage() {
    const options = {
      method: 'POST',
      url: 'https://html-css-to-image4.p.rapidapi.com/image',
      headers: {
        'content-type': 'application/json',
        'X-RapidAPI-Key': 'e7705f2b2dmsh30a3344feace905p1bc0c3jsn5aeba74ffaca',
        'X-RapidAPI-Host': 'html-css-to-image4.p.rapidapi.com'
      },
      data: {
        html: html,
        ms_delay: 10,
        format: 'png',
        device_scale: 1
      }
};

  try {
    const response = await axios.request(options);
    console.log(response.data);
    setUserImageUrl(response.data.url);
    imageUrl = response.data.url;
  } catch (error) {
    console.error(error);
  }
  } */

  const getScore = () => {
    let data = new FormData();
          data.append('url', imageUrl);
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/score/',
            data : data
          };
          axios.request(config)
          .then((response) => {
            console.log(response.data);
            setScore(parseInt(response.data.score))
          })
          .catch((error) => {
            console.log(error);
          });
  }
  
  
  async function handleCapture () {
      
      await createImage();
      getScore();

  };

  const toastGenerator = (data) => {
    toast.success(data, {
      style: {
        borderRadius: '10px',
        background: '#0C2534',
        color: '#fff',
      },
    })
  }

 /*  useEffect(() => {
    let data = new FormData();
          data.append('url', userImageUrl);
          let config = {
            method: 'post',
            maxBodyLength: Infinity,
            url: 'http://127.0.0.1:8000/api/score/',
            data : data
          };
          axios.request(config)
          .then((response) => {
            console.log(response.data);
          })
          .catch((error) => {
            console.log(error);
          });
          console.log(userImageUrl)
  }, [userImageUrl]) */

  /* 
  User ID: 20a59766-523b-447a-9390-f4532b880873
  API Key: 4e96f97d-eeed-4848-860e-9033417b2df9
  */

/*   const popper = () => {
    return (
      <Confetti
      width={window.innerWidth}
      height={window.innerHeight}
    />
    )
  } */


  return (
    <div className='code_arena'>
      {/* {score > 70 ? popper() : null} */}
      <Toaster position="bottom-right" reverseOrder={false}/>
      <div className="code_editor_container">
        <CodeEditor 
          language="htmlmixed"
          displayName="HTML"
          value={html}
          onChange={setHtml}
        />
        <span className="submit_btn" id='submit_btn' onClick={() => {;handleCapture(); toastGenerator('Your scores are being calculated...')}}>
          Submit
        </span>
      </div>
      <div className="problem_live_view_container">
        <div className="live_view_container">
          <div className="container_heading">Live Code Output
            <div className="comparison_options">
              <div className="option">
                <input type="checkbox" id='slide&compare' name='slide&compare' checked={slider} onClick={(e) => {
                  slider ? setSlider(false) : setSlider(true)
                }}/>
                <label htmlFor="slide&compare">Slide & Compare</label>
              </div>
              <div className="option">
                <input type="checkbox" id='diff' name='diff'
                  onClick={(e) => {e.target.checked ? document.querySelector('.difference_img').style.display = 'block' : document.querySelector('.difference_img').style.display = 'none'}}
                />
                <label htmlFor="diff">Difference</label>
              </div>
            </div>
          </div>
          <iframe
            srcDoc={srcDoc}
            id='iframe'
            title="output"
            sandbox="allow-scripts"
            className='live_view'
          />
          <div className="hiddenDivHover" id="hiddenDivHover"
            onMouseMove={(e)=>{
              if(slider){
                let rect = e.target.getBoundingClientRect();
                let x = -parseInt(e.clientX - rect.right);
                document.querySelector('.slider_image').style.display = 'block'
                document.querySelector('.slider_image').style.width = x + 'px'
              }
            }}
            onMouseLeave={(e)=>{
              document.querySelector('.slider_image').style.display = 'none'
            }}
          ></div>
          <img src={arenaData.url} className="difference_img" />
          {/* <button id="btn" onClick={() => handleCapture()}>click</button>
          <div id="image-container"></div> */}
        </div>
        <div className="problem_img_container">
          <div className="container_heading">Target
            <div className="dimensions">400px X 300px</div>
          </div>
          <img src={arenaData.url} className='problem_img' />
          <div className="colors_container">
            {
              /* colors.length? colors : colors.map((color) => {
                return (
                  <div className="color_box" onClick={(e) => {navigator.clipboard.writeText(e.target.childNodes[0].data)}}>
                    <div className="color" style={{backgroundColor: color}}></div>
                    <div className="color_code">{color}</div>
                  </div>
                )
              }) */
              colors.length? colors.map((color) => {
                return (
                  <div className="color_box" onClick={(e) => {navigator.clipboard.writeText(e.target.childNodes[0].data); toastGenerator('Color is copied to clipboard!')}}>
                    <div className="color" style={{backgroundColor: color}}></div>
                    <div className="color_code">{color}</div>
                  </div>
                )
              }) : null
            }
            {/* <div className="color_box" onClick={(e) => {navigator.clipboard.writeText(e.target.childNodes[0].data)}}>
              <div className="color"></div>
              <div className="color_code">#000D15</div>
            </div>
            <div className="color_box">
              <div className="color"></div>
              <div className="color_code">#000D15</div>
            </div> */}
          </div>
          <div className="score_container">
            <span>Score Board : </span>
            <span className='score' id='score'>{score}</span>
            {/* <span className='score_instruction'>(click submit to calculate your score)</span> */}
          </div>
          <div className="create_room_btn" onClick={() => setShowForm(true)}>
            Create Battle Arena
          </div>
        </div>
        {/* <div className="score_submit_container">
          <div className="score_container">
            <span>Your score is: </span>
            <span className='score' id='score'>{score}</span>
          </div>
          <span className="submit_btn" id='submit_btn'>
            Submit
          </span>
        </div> */}
      </div>
      {showForm ? <ArenaCreateForm setShowForm={setShowForm} arenaId={params.id} /> : null}
    </div>
  )
}
