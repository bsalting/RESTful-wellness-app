import React from 'react';
import { NavLink } from 'react-router-dom';
import Link from '@mui/material/Link';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

function Nav() {
  return (
    <nav>
      <span className="logo-span">
        <Typography
          variant="h4"
          sx={{
            display: { xs: 'none', md: 'flex' },
            fontFamily: 'Lucida Grande',
            fontWeight: 700,
            color: 'slate gray',
            textDecoration: 'none',
          }}
        >
          RESTFul
        </Typography>
      </span>
      <span className="link-span">
        <Link underline="hover" key={'Home'} href={'/'}>
          <Button sx={{ margin: 1.5 }}>
            <Typography> Home </Typography>
          </Button>
        </Link>
        <Link underline="hover" key={'Meditate'} href={'#/meditation'}>
          <Button sx={{ margin: 1.5 }}>
            <Typography> Meditate </Typography>
          </Button>
        </Link>
        <Link underline="hover" key={'Meander'} href={'#/park'}>
          <Button sx={{ margin: 1.5 }}>
            <Typography> Meander </Typography>
          </Button>
        </Link>
        <Link underline="hover" key={'Gratitude'} href={'#/journal'}>
          <Button sx={{ margin: 1.5 }}>
            <Typography> Reflect </Typography>
          </Button>
        </Link>
        <Link underline="hover" key={'Give'} href={'#/give'}>
          <Button sx={{ margin: 1.5 }}>
            <Typography> Give </Typography>
          </Button>
        </Link>
      </span>
    </nav>
  );
}

export default Nav;
