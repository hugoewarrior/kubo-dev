export type AlertTitleVariants = 'success' | 'info' | 'warning' | 'error'

export interface ISnackMessage {
    message: string | null,
    snackType: AlertTitleVariants
}
