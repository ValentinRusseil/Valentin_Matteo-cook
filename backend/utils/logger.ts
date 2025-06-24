import { join } from 'https://deno.land/std/path/mod.ts';

interface ErrorLog {
    timestamp: string;
    error: {
        name: string;
        message: string;
        stack?: string;
    };
    context?: {
        path?: string;
        method?: string;
        body?: unknown;
    };
}

class ErrorLogger {
    private static instance: ErrorLogger;
    private logFile: string;

    private constructor() {
        // Création du dossier logs s'il n'existe pas
        const logsDir = join(Deno.cwd(), 'logs');
        try {
            Deno.mkdirSync(logsDir, { recursive: true });
        } catch {
            // Le dossier existe déjà, on notifie l'utilisateur
            console.warn('Le dossier logs existe déjà, les logs seront écrits dans le fichier error.log');
        }
        this.logFile = join(logsDir, 'error.log');
    }

    public static getInstance(): ErrorLogger {
        if (!ErrorLogger.instance) {
            ErrorLogger.instance = new ErrorLogger();
        }
        return ErrorLogger.instance;
    }

    public async logError(error: Error, context?: { path?: string; method?: string; body?: unknown }): Promise<void> {
        const errorLog: ErrorLog = {
            timestamp: new Date().toISOString(),
            error: {
                name: error.name,
                message: error.message,
                stack: error.stack,
            },
            context,
        };

        try {
            await Deno.writeTextFile(this.logFile, JSON.stringify(errorLog, null, 2) + '\n', { append: true });
        } catch (writeError) {
            console.error("Erreur lors de l'écriture du log:", writeError);
        }
    }
}

export const errorLogger = ErrorLogger.getInstance();
