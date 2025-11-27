import React, { useState, useEffect } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import FavoriteIcon from '@mui/icons-material/Favorite';


import minhaFoto from '../minhafoto.jpg';

export default function SobreAutor() {
  
  
  const [likes, setLikes] = useState(() => {
    // Tenta ler o valor do localStorage
    const savedLikes = window.localStorage.getItem('likes');
    //converte para número
    return savedLikes ? parseInt(savedLikes) : 0;
  });

  
  useEffect(() => {
    window.localStorage.setItem('likes', likes);
  }, [likes]);

  function handleLikeClick() {
    setLikes(prev => prev + 1);
  }

  return (
   
    <div style={{ padding: '20px' }}>
      
      
      <Typography variant="h4" gutterBottom style={{ marginBottom: '20px' }}>
        Sobre o autor
      </Typography>

      
      <Card sx={{ maxWidth: 345 }}>
        
       
        <CardMedia
          component="img"
          alt="Foto do Autor"
          height="300" 
          image={minhaFoto} 
        />
        
        <CardContent>
          
          <Typography gutterBottom variant="h5" component="div">
            Abner Jesus
          </Typography>
          
         
          <Typography variant="body2" color="text.secondary">
            Sou estudante de Análise e Desenvolvimento de Sistemas, apaixonado por tecnologia, React e desenvolvimento web. Procuro por mais conhecimentos e ser feliz com minha esposa.
          </Typography>
        </CardContent>
        
        <CardActions>
          <Button 
            variant="contained" 
            color="secondary" 
            startIcon={<FavoriteIcon />} 
            onClick={handleLikeClick}
          >
            CURTIR ({likes})
          </Button>
        </CardActions>
      </Card>
    </div>
  );
}