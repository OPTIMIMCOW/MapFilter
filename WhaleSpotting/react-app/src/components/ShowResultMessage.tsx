import "../styles/ShowResultMessage.scss";

interface ShowResultMessageProps {
    responseMessage: string | void;
    backgroundRed?: boolean;
}

export default function ShowResultMessage({ responseMessage, backgroundRed }: ShowResultMessageProps): JSX.Element {
    return responseMessage
        ? <p data-testid="response-result" className={backgroundRed ? "red-background" : "response-message-card"}>
            {responseMessage}
        </p>
        : <div />;
}