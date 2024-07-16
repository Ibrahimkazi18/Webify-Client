import { RWebShare } from "react-web-share";
import { Button } from "./ui/button";
import toast from "react-hot-toast";

interface ShareButtonProps {
    title :string,
    text : string, 
    url : string
}

const ShareButton = ({ title, text, url } : ShareButtonProps) => {
    return (
        <RWebShare
            data={{
                text: text,
                title: title,
                url: url,
            }}
        >
            <Button variant={"ghost"}>Share</Button>
        </RWebShare>
    );
};
export default ShareButton;