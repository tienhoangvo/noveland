// mui components
import Tooltip from "@mui/material/Tooltip";
import IconButton from "@mui/material/IconButton";

const IconButtonWithToolip = ({ title, children, ...rest }) => {
  return (
    <>
      {!title && (
        <IconButton color="inherit" {...rest}>
          {children}
        </IconButton>
      )}

      {title && (
        <Tooltip title={title}>
          <IconButton color="inherit" {...rest}>
            {children}
          </IconButton>
        </Tooltip>
      )}
    </>
  );
};

export default IconButtonWithToolip;
