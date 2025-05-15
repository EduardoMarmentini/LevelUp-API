interface ValidationError {
    message: string;
}

abstract class Validator {
    protected errors: ValidationError[] = [];

    protected addError(message: string): void {
        this.errors.push({ message });
    }

    public getErrors(): ValidationError[] {
        return this.errors;
    }

    public clearErrors(): void {
        this.errors = [];
    }

    public isValid(): boolean {
        return this.errors.length === 0;
    }
}

export class ValidationContract extends Validator {
    
    public isRequired(value: any, message: string): void {
        if (!value || (typeof value === 'string' && value.trim().length === 0)) {
            this.addError(message);
        }
    }

    public hasMinLen(value: string, min: number, message: string): void {
        if (!value || value.length < min) {
            this.addError(message);
        }
    }

    public hasMaxLen(value: string, max: number, message: string): void {
        if (!value || value.length > max) {
            this.addError(message);
        }
    }

    public isFixedLen(value: string, len: number, message: string): void {
        if (!value || value.length !== len) {
            this.addError(message);
        }
    }

    public isEmail(value: string, message: string): void {
        const emailPattern = /^\w+([-+.']\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/;
        if (!emailPattern.test(value)) {
            this.addError(message);
        }
    }

    public isBase64(value: string, message: string): void {
        const base64Pattern = /^data:image\/[a-zA-Z]+;base64,[^\s]+$/;
        if (!base64Pattern.test(value)) {
            this.addError(message);
        }
    }
}
