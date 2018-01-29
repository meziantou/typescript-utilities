import "reflect-metadata";

export function required(target: any, propertyKey: string) {
    addValidationRule(target, propertyKey, RequiredValidationRule.instance);
}

export function addValidationRule(target: any, propertyKey: string, rule: IValidationRule) {
    let rules: IValidationRule[] = Reflect.getMetadata("validation", target, propertyKey) || [];
    rules.push(rule);

    let properties: string[] = Reflect.getMetadata("validation", target) || [];
    if (properties.indexOf(propertyKey) < 0) {
        properties.push(propertyKey);
    }

    Reflect.defineMetadata("validation", properties, target);
    Reflect.defineMetadata("validation", rules, target, propertyKey);
}

export interface IValidationRule {
    evaluate(target: any, value: any, key: string): string | null;
}

class RequiredValidationRule implements IValidationRule {
    static instance = new RequiredValidationRule();

    evaluate(target: any, value: any, key: string): string | null {
        if (value) {
            return null;
        }

        return `${key} is required`;
    }
}

export function validate(target: any) {
    const keys = Reflect.getMetadata("validation", target) as string[];
    let result: string[] = [];
    if (Array.isArray(keys)) {
        for (const key of keys) {
            const rules = Reflect.getMetadata("validation", target, key) as IValidationRule[];
            if (!Array.isArray(rules)) {
                continue;
            }

            for (const rule of rules) {
                const ruleResult = rule.evaluate(target, target[key], key);
                if (ruleResult) {
                    result.push(ruleResult);
                }
            }
        }
    }

    return result;
}

export function isValid(target: any) {
    const validationResult = validate(target);
    return validationResult.length === 0;
}
