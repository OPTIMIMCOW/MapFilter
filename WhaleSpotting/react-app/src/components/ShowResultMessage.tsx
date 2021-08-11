import "../styles/ShowResultMessage.scss";

interface ShowResultMessageProps {
    responseMessage: string | void;
    showForm: boolean;
}

export default function ShowResultMessage({ responseMessage, showForm }: ShowResultMessageProps): JSX.Element {
    return responseMessage
        ? <p data-testid="response-result" className={showForm ? "response-message-card" : "error-background"  }>
            {responseMessage}
        </p>
        : <div />;
}