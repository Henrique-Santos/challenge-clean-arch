export type NotificationErrorProps = {
    message: string
    context: string
}

export default class Notification {
    private _errors: NotificationErrorProps[] = []

    addError(error: NotificationErrorProps) {
        this._errors.push(error)
    }

    messages(context?: string): string {
        let message = ''
        this._errors
        .filter(err => err.context == context || !context)
        .forEach(err => message += `${err.context}: ${err.message},`)
        return message
    }

    hasErrors(): boolean {
        return this._errors.length > 0
    }

    get errors(): NotificationErrorProps[] {
        return this._errors
    }
}