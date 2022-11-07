import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import TaskAltIcon from '@mui/icons-material/TaskAlt';

export default function EventTypeIcon(props: { isClosed: boolean }) {
    if (props.isClosed) {
        return (<TaskAltIcon />);
    }
    return (<HourglassBottomIcon />);
}