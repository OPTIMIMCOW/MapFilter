import "../styles/ShowResultMessage.scss";

interface ShowResultMessageProps {
    responseMessage: string | void;
}

export default function ShowResultMessage({ responseMessage }: ShowResultMessageProps): JSX.Element {
    if (responseMessage) {
        return (
            <p data-testid="response-result" className="response-message-card">
                {responseMessage}
            </p>);
    }
    return <div></div>;
}