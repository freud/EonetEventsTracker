import { TableCell, experimental_sx as sx, styled } from "@mui/material";
import { grey } from "@mui/material/colors";

export default function EventsGridCell(props: { disabled?: boolean, children: any }) {
    const StyledTableCell = styled(TableCell)(sx({ color: grey[500] }));
    if (props.disabled) {
        return (<StyledTableCell>{props.children}</StyledTableCell>);
    }
    return (<TableCell>{props.children}</TableCell>);
}