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
          <Button>
            <Typography> Home </Typography>
          </Button>
        </Link>
        <Link underline="hover" key={'Meditate'} href={'#/meditation'}>
          <Button>
            <Typography> Meditate </Typography>
          </Button>
        </Link>
        <Link underline="hover" key={'Meander'} href={'#/park'}>
          <Button>
            <Typography> Meander </Typography>
          </Button>
        </Link>
        <Link underline="hover" key={'Gratitude'} href={'#/journal'}>
          <Button>
            <Typography> Gratitude </Typography>
          </Button>
        </Link>
      </span>
    </nav>
  );
}

export default Nav;
