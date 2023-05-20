import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

import Slider from 'react-slick';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import clsx from 'clsx';
// @mui
import {Typography} from '@mui/material';
import styles from "./slide.module.css";

function Top10Song() {
    
    const [top10Song, setTop10Song] = useState([]);
    
    useEffect(() => {
      fetch('http://localhost:3001/api/topSongs')
        .then(response => response.json())
        .then(data => {
          setTop10Song(data)
        })
        .catch(error => {
          console.log(error);
        });
    }, []);
  
    const settings = {
      infinite: true,
      speed: 500,
      slidesToShow: 3,
      slidesToScroll: 1,
      autoplay: true, 
      autoplaySpeed: 2000, 
    };
  
    return (
        <>
            <Typography variant="h3" gutterBottom>
                Top 10 ca khúc
            </Typography>
            <Slider className={styles.slideContainer} {...settings}>
            {top10Song.map((music) => {
                const { id, tenBaiHat,  sourceImg} = music;
                return (
                <Link key={id} className='SongLink' to={`/songs/${id}`}>
                    <img src={sourceImg} className={clsx(styles.imgSlide, "card-img-top")} alt={tenBaiHat} />
                </Link>
                )
            })}
            </Slider>
        </>
    );
  }
  
  export default Top10Song;