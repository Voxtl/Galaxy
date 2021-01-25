export class Authentication {
    // Potential type-guard/check
    static isAuthenticated() {
        throw "unimplemented"
    }

    // This'd make a nice decorator,
    static requireAuth(): MethodDecorator {
        return function(
            // eslint-disable-next-line @typescript-eslint/ban-types
            target: Object,
            propertyDescriptor: string | symbol,
            descriptor: PropertyDescriptor
        ) {
            throw "unimplemented"
        }
    }
}