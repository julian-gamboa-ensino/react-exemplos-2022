import  { useState } from 'react';
import { Button, AppBar, Toolbar, Menu, MenuItem } from '@mui/material';

function MeuComponenteMaterial() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" onClick={handleClick}>
            Exemplos
          </Button>
          <Menu
            anchorEl={anchorEl}
            open={Boolean(anchorEl)}
            onClose={handleClose}
          >
            <MenuItem onClick={handleClose}>Option 1</MenuItem>
            <MenuItem onClick={handleClose}>Option 2</MenuItem>
            <MenuItem onClick={handleClose}>Option 3</MenuItem>
          </Menu>
          {/* Other buttons */}
        </Toolbar>
      </AppBar>

      {/* Rest of your component's content */}
    </div>
  );
}

export default MeuComponenteMaterial;
