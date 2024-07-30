import { FunctionExpression, SourceLocation } from '@babel/types';
/**
 * Represents a lexical scope in the map file
 */
export interface LexicalScopeData {
  declarations: DeclarationItemData[] | "inherit";
  references: ReferenceData[];
  unresolved: ReferenceData[];
  nested: LexicalScopeData[];
}
/**
 * Represents a declaration item in the map file.
 */
export interface DeclarationItemData {
  globalId: number;
  localId: number;
  name: string;
  type: string;
  line?: number;
  column?: number;
  mangledName: string | null;
  referenceCount: number;
  nestedReferenceCount: number;
  tree: number;
}
/**
 * Represents a resolved/unresolved reference in the map file
 */
export interface ReferenceData {
  id: string;
  globalId?: number;
  line?: number;
  column?: number;
}
/**
 *
 */
export interface IInternalSourceMap {
  lastAbsoluteLocations: {
    original: SourceLocation;
    generated: SourceLocation;
  };
  lastRelativeLocations: {
    original: SourceLocation;
    generated: SourceLocation;
  };
  longestSegment: number;
  names: string[];
  source: number;
  mappings: string;
}
/**
 * The ES version of a particular source file.
 */
export type ESVersion = "es5" | "es2015" | "es2016" | "es2017" | "es2018" | "es2019" | "es2020";
/**
 * Describes the available configuration options
 */
export interface ConfigurationOptions {
  booleanLiterals?: boolean | RandomizableOption | null;
  constantArgument?: boolean | null;
  consoleCloaking?: boolean | ConsoleCloackingOptions | null;
  controlFlow?: boolean | ControlFlowOptions | null;
  dateLock?: boolean | DateLockOptions | null;
  debuggerRemoval?: boolean | null;
  devToolsBlocking?: boolean | DevToolsOptions | null;
  domainLock?: boolean | string | DomainLockOptions | null;
  exprSequence?: boolean | null;
  functionReorder?: boolean | RandomizableOption | null;
  globalObjectHiding?: boolean | GlobalHidingOptions | null;
  integerLiterals?: boolean | IntegerLiteralOptions | null;
  localDeclarations?: boolean | LocalDeclarationOptions | null;
  propertyIndirection?: boolean | null;
  propertySparsing?: boolean | null;
  selfDefending?: boolean | number | SelfDefendingOptions | null;
  stringLiterals?: boolean | null;
  variableGrouping?: boolean | null;
}
/**
 * Represents a configuration option that can be randomized.
 */
export interface RandomizableOption {
  randomize?: boolean;
}
/**
 * Represents configuration options for console cloaking
 */
export interface ConsoleCloackingOptions {
  exclude: string | string[];
}
/**
 * Represents configuration options for global object hiding
 */
export interface GlobalHidingOptions {
  usePredefined?: boolean;
  include?: string | string[];
  exclude?: string | string[];
}
/**
 * Represents the configuration options of control flow transform
 */
export interface ControlFlowOptions extends RandomizableOption {
  injectFakeCode?: boolean;
}
/**
 * Represents the configuration options of domain lock transform
 */
export interface DomainLockOptions {
  domainPattern: string;
  errorScript?: string;
}
/**
 * Represents the configuration options of date lock transform
 */
export interface DateLockOptions {
  startDate?: string;
  endDate?: string;
  errorScript?: string;
}
/**
 * Represents the configuration options for DevToos detection
 */
export interface DevToolsOptions {
  patience: number;
}
/**
 * Represents the configuration options of integer literal transform
 */
export interface IntegerLiteralOptions extends RandomizableOption {
  radix?: IntegerLiteralRadix | IntegerLiteralRadix[];
  lower?: number;
  upper?: number;
}
/**
 * Represents the configuration of local declaration transform
 */
export interface LocalDeclarationOptions {
  nameMangling?: NameManglingMode;
  excludeIds?: string | Array<string>;
}
/**
 * Represents self-defending options
 */
export interface SelfDefendingOptions {
  level: number;
  errorScript?: string;
}
declare enum IntegerLiteralRadix {
  /**
   * No radix specified
   */
  None = "none",
  /**
   * All integer literals are converted to binary
   */
  Binary = "binary",
  /**
   * All integer literals are converted to decimal
   */
  Decimal = "decimal",
  /**
   * All integer literals are converted to hexadecimal
   */
  Hexadecimal = "hexadecimal",
  /**
   * All integer literals are converted to octal
   */
  Octal = "octal",
}
declare enum NameManglingMode {
  /**
   * Hexadecimal variable names starting with "_0x" using the sequential
   * index of variable declarations. Suggested to use during testing.
   */
  Sequential = "sequential",
  /**
   * Hexadecimal variable names starting with "_0x" using encoded index of
   * variable declarations. Suggested to use in production.
   */
  Hexadecimal = "hexadecimal",
  /**
   * Convert all variable names to uppercase and lowercase letters plus
   * optional integer suffix
   */
  Base52 = "base52",
  /**
   * Convert all variable names to uppercase and lowercase letters, digits plus
   * optional integer suffix
   */
  Base62 = "base62",
  /**
   * Instead of letters and digit, use emojis when creating a name
   */
  Runic = "runic",
  Glagolitic = "glagolitic",
  Tifinagh = "tifinagh",
}
declare enum ProtectionLogEntryType {
  Info = "Info",
  Warning = "Warning",
  Error = "Error",
}
/**
 * Represents a protection log entry.
 */
export interface ProtectionLogEntry {
  /**
   * Type of the entry.
   */
  type: ProtectionLogEntryType;
  /**
   * Log message.
   */
  message: string;
  /**
   * Optional code that helps identifying a message
   */
  code?: string;
}
/**
 * A function that can process the log entries
 */
export type ProtectionLogger = (entry: ProtectionLogEntry) => void;
/**
 * This interface represents the source information we pass
 * to the protection engine
 */
export interface SourceInfo {
  /**
   * Source code to protect
   */
  sourceCode: string | FunctionExpression;
  /**
   * Is the source code loaded as a module?
   */
  isModule?: boolean;
  /**
   * Optional file path of the source.
   */
  filePath?: string;
}
/**
 * Represents the result of protection
 */
export interface ProtectionResult {
  /**
   * Indicates if the protection was successful
   */
  success: boolean;
  /**
   * The JSDefender runtime, if it should be separated
   */
  jsdRuntime: string | null;
  /**
   * The contents of the protected files
   */
  protectedSources: string[];
  /**
   * The object that summarizes the protection process
   */
  protectionSummary: ProtectionSummary;
  /**
   * The map outputs of protected files.
   */
  maps: LexicalScopeData[];
  /**
   * Source map container with IInternalSourceMap objects (or nothing) inside.
   */
  sourceMaps: IInternalSourceMap[];
  /**
   * Contains Metro bundle module info (or nothing, if not a metro bundle).
   */
  metroBundleInfo: MetroBundleModuleInfo[] | null;
}
/**
 * Provides a summary about the protection process.
 */
export interface ProtectionSummary {
  /**
   * The length of the input source code.
   */
  sourceCodeLength: number[];
  /**
   * Indicates if the source code is a bundle.
   * It alwasy returns false for v1.x
   */
  isBundle: boolean[];
  /**
   * Number of syntax nodes
   */
  numSyntaxNodes: number[];
  /**
   * Number of functions
   */
  numFunctions: number[];
  /**
   * The maximum depth of functions
   */
  maxFunctionDepths: number[];
  /**
   * The number of statements
   */
  numStatements: number[];
  /**
   * The number of classes
   */
  numClasses: number[];
  /**
   * The number of modules.
   * In v1.x, it is always 0.
   */
  numModules: number[];
  /**
   * The number of loops in the code.
   */
  numLoops: number[];
  /**
   * The number of if/switch statements in the code
   */
  numConditions: number[];
  /**
   * The number of break, continue, return, throw statements in the code.
   */
  numFlowBreaking: number[];
  /**
   * The ES version of the source code.
   */
  esVersion: ESVersion[];
  /**
   * The length of the protected source code.
   */
  protectedSourceLength: number[];
  /**
   * The object that describes the transformation summary
   * of a
   */
  transformSummary: TransformSummary[];
  /**
   * The execution time in milliseconds (for each script)
   */
  executionTime: number;
  /**
   * Indicates if the source code has a parsing error.
   */
  hasParseError: boolean[];
  /**
   * Message of the protection exception.
   */
  protectionException?: string;
  /**
   * Message of protection input validation exception
   */
  inputError?: string;
  /**
   * Indicates if the protected file has any unsafe constructs
   */
  unsafeConstructs: boolean[];
  /**
   * The entries of the protection log
   */
  protectionLog: ProtectionLogEntry[];
  /**
   * The seed of random number generation used for protection
   */
  randomSeed: number;
}
/**
 * Represents a transformation summary
 */
export type TransformSummary = { [key in keyof ConfigurationOptions]: number };
/**
 * Represents Metro bundle module info
 */
export interface MetroBundleModuleInfo {
  /**
   * Beginning index of the module in bundle
   */
  start: number;
  /**
   * End index of module in bundle
   */
  end: number;
}
/**
 * Describes the shape of data that configures the protection process.
 */
export interface ProtectionConfiguration extends ProtectionConfigurationBase {
  /**
   * Global protection settings for each source script
   */
  sourceSets?: (string | SpecialNameSet)[];
  /**
   * Indicates if maps should be generated or not
   */
  generateMaps?: boolean;
  /**
   * Represents JSDefender Runtime file option
   */
  runtimeFile?: string;
}
/**
 * Describes the shape of data is used as a common configuration base class for
 * the protection core and the CLI.
 */
export interface ProtectionConfigurationBase {
  /**
   * Configuration options to use
   */
  settings?: ConfigurationOptions;
  /**
   * The license key to use with the current session
   */
  license?: string;
  /**
   * Licensing requires an email from the user
   */
  email?: string;
  /**
   * License config parameter: should the version update check be run
   * alongside the license validation
   */
  checkForUpdates?: boolean;
  /**
   * You can use named option sets with inline configuration
   */
  namedSets?: {
    [key: string]: ConfigurationOptions;
  };
  /**
   * The target platform to use when protecting the source code.
   */
  esTarget?: EsTarget | null;
  /**
   * The seed value for random number generations.
   */
  randomSeed?: number | null;
  /**
   * Represents JSDefender Runtime protection options
   */
  runtimeInjection?: RuntimeInjectionMode | RuntimeInjectionOptions | null;
  /**
   * Indicates if the protection should ignore unsafe constructs.
   */
  ignoreUnsafeConstructs?: boolean | null;
  /**
   * Indicates if inline protection options should be disabled.
   */
  disableInline?: boolean | null;
  /**
   * Indicates whether source maps should be generated from the source code.
   */
  sourceMaps?: boolean | null;
  /**
   * Enables glob pattern matching for input paths
   */
  glob?: boolean;
  /**
   * Filename -> module ID map for detecting user modules
   */
  filenameMap?: Map<number, string>;
  /**
   *
   */
  protectUserModulesOnly?: boolean;
}
/**
 * The target platform to use when protecting the source code.
 */
export type EsTarget = "es5" | "es2015" | "es2016" | "es2017" | "es2018" | "es2019" | "es2020";
export type SpecialNameSet = "off" | "disableinline" | "disable-inline" | "disableInline" | "default";
declare enum RuntimeInjectionMode {
  /**
   * Puts the JSDefender Runtime into the first non-module file
   */
  FirstNonModule = "firstNonModule",
  /**
   * Puts the JSDefender Runtime into a separate file
   */
  SeparateSource = "separateSource",
  /**
   * Injects a separate Runtime to each source that requires it.
   */
  All = "all",
}
/**
 * Describes the JSDefender Runtime options
 */
export interface RuntimeInjectionOptions {
  mode?: RuntimeInjectionMode;
  options: string;
}
/**
 * Represents the application-realted settings of PreEmptive Analytics
 */
export interface AnalyticsAppSettings {
  /**
   * Set it to true to explicitly disable analytics
   */
  optOut?: boolean;
  /**
   * Required. A self-generated UUID string to represent this
   * application or site.
   */
  appId: string;
  /**
   * Required. A string containing the name of this application
   * or site.
   */
  appName: string;
  /**
   * Optional. A string containing the version number of this
   * application or site. The core's version is used if not provided.
   */
  appVersion?: string;
  /**
   * Optional. ID for the evaluation version
   */
  evalAppId?: string;
  /**
   * Optional. Name for the evaluation version
   */
  evalAppName?: string;
}
export interface CallerPluginInformation {
  /**
   * Name of the plugin or input interface which called the protection service.
   */
  name: string;
}
/**
 * Executes the source code protection.
 * @param sourceSet The source code to protect. It can be a single script, or an array
 * of scripts, where the order is the loading order of scripts in a page.
 * @param protectionConfiguration The configuration options that determine how to protect the provided source code.
 * @param callerPluginInformation Information about the plugin or interface that called this function.
 * @param logger An optional action that receives the log messages and processes them.
 * @returns The protected source code scripts, in the same order as the input. So, the string at index
 * N in the result is the protected version of input script at index N.
 */
export declare function protectSource(sourceSet: SourceInfo[], protectionConfiguration?: ProtectionConfiguration, callerPluginInformation?: CallerPluginInformation, logger?: ProtectionLogger): Promise<ProtectionResult>;
/**
 * This interface represents on object that can be used to generate random numbers
 * for the protection.
 */
export interface IRandomNumberHandler {
  /**
   * Gets a random integer number between the specified values
   * @param min Minimum value (inclusive)
   * @param max Maximum value (exclusive)
   */
  getRandomInt(min: number, max: number): number;
}
/**
 * This interface represents the PreEmptive Anyalytics `appStart` method settings
 */
export interface AnalyticsAppStartSettings extends AnalyticsAppSettings {
  /**
   * Required. A self-generated UUID string to represent the unique
   * business entity sending messages.
   */
  companyId: string;
  /**
   * Optional. Your company name string.
   */
  companyName?: string;
  /**
   * Optional. A variable to access or function to call to retrieve a
   * user-specific identifier (such as a hashed login name or serial number)
   * for compiling usage data by individual user. If omitted, no user-specific
   * data is collected or displayed.
   */
  instanceId?: string;
  /**
   * Optional. When set to a value returned from a previous call to appStart,
   * the API initialization is performed within the context of the indicated
   * session. No start messages are sent. See Session Management for an example.
   */
  sessionId?: string;
  /**
   * Turns on extended headers
   */
  sendExtendedHeaders: boolean;
}
/**
 * This interface represents an object that handles run-time analytics data
 * through PreEmptive Analytics.
 */
export interface IAnalyticsHandler {
  /**
   *
   * @param settings An object containing initialization settings.
   * @param properties An optional object containing arbitrary string
   * or numeric properties to attach to the session start message.
   * @returns This function returns a session Id that may be used for
   * subsequent calls to appStart.
   */
  appStart(settings: AnalyticsAppStartSettings, properties?: Record<string, any>): Promise<any>;
  /**
   * Send a session stop message. Run loaded plugins' stop functions.
   * Prevent further messages from being sent. Use of this function is
   * optional, and is useful if your application or site has the concept
   * of an explicit session end (such as a 'log out' action).
   * @param properties An optional object containing arbitrary string
   * or numeric properties to attach to the session stop message.
   */
  appStop(properties?: Record<string, any>): Promise<void>;
  /**
   * Send an instantaneous feature message.
   * @param featureName A string containing the name of the feature to report.
   * @param properties An optional object containing arbitrary string
   * or numeric properties to attach to the feature tick message.
   */
  featureTick(featureName: string, properties?: Record<string, any>): Promise<void>;
  /**
   * Send a feature start message. Paired with a feature stop message
   * of the same name, the duration of the feature use will be calculated.
   * Nested feature starts are supported.
   * @param featureName A string containing the name of the feature to report.
   * @param properties An optional object containing arbitrary string or
   * numeric properties to attach to the feature start message.
   */
  featureStart(featureName: string, properties?: Record<string, any>): Promise<void>;
  /**
   * Send a feature stop message. This must be paired with a feature start
   * message of the same name. A lone feature stop message will be ignored.
   * @param featureName A string containing the name of the feature to report.
   * @param properties An optional object containing arbitrary string or
   * numeric properties to attach to the feature stop message.
   */
  featureStop(featureName: string, properties?: Record<string, any>): Promise<void>;
  /**
   * Report an Error object that has been not been caught within any catch
   * block and has been surfaced by the runtime's onError event. The error
   * details as well as a stack trace will be captured by the endpoint.
   * @param error The Error object to report.
   * @param contact An optional string containing contact information provided
   * by the user. You are free to gather this information via whatever
   * mechanism you choose. You should collect this information after the
   * error has occurred, so that the end user can choose to provide a contact
   * address to be used for following up on the error being reported.
   * @param comment An optional string containing a free-form comment provided
   * by the user. You are free to gather this information via whatever mechanism
   * you choose. You should collect this information after the error has occurred,
   * so that the end user can choose to provide some details about what they
   * were doing when they experienced the error.
   * @param properties An optional object containing arbitrary string or numeric
   * properties to attach to the error reporting message.
   */
  errorUncaught(error: Error, contact?: string, comment?: string, properties?: Record<string, any>): Promise<void>;
  /**
   * Report an Error object that has been caught within a catch block. The
   * error details as well as a stack trace will be captured by the endpoint.
   * @param error The Error object to report.
   * @param contact An optional string containing contact information provided
   * by the user. You are free to gather this information via whatever
   * mechanism you choose. You should collect this information after the
   * error has occurred, so that the end user can choose to provide a contact
   * address to be used for following up on the error being reported.
   * @param comment An optional string containing a free-form comment provided
   * by the user. You are free to gather this information via whatever mechanism
   * you choose. You should collect this information after the error has occurred,
   * so that the end user can choose to provide some details about what they
   * were doing when they experienced the error.
   * @param properties An optional object containing arbitrary string or numeric
   * properties to attach to the error reporting message.
   */
  errorCaught(error: Error, contact?: string, comment?: string, properties?: Record<string, any>): Promise<void>;
  /**
   * Report an Error object that has been thrown by the throw keyword.
   * The error details as well as a stack trace will be captured by
   * the endpoint.
   * @param error The Error object to report.
   * @param contact An optional string containing contact information provided
   * by the user. You are free to gather this information via whatever
   * mechanism you choose. You should collect this information after the
   * error has occurred, so that the end user can choose to provide a contact
   * address to be used for following up on the error being reported.
   * @param comment An optional string containing a free-form comment provided
   * by the user. You are free to gather this information via whatever mechanism
   * you choose. You should collect this information after the error has occurred,
   * so that the end user can choose to provide some details about what they
   * were doing when they experienced the error.
   * @param properties An optional object containing arbitrary string or numeric
   * properties to attach to the error reporting message.
   */
  errorThrown(error: Error, contact?: string, comment?: string, properties?: Record<string, any>): Promise<void>;
  /**
   * Flushes the contents of analytics message queue. You should use this operationű
   * before exiting an app to make sure that all analytics messages are sent out.
   */
  flush(): Promise<void>;
}
/**
 * Represents the services of a license key store (for testing purposes)
 */
export interface ILicenseKeyStore {
  /**
   * Gets the value of the PJSD_LICENSE environment variable
   */
  getPJSDVariable(): string | undefined;
  /**
   * Gets the value of the PJSD_LICENSE environment variable
   */
  getJSDEFENDERVariable(): string | undefined;
  /**
   * Gets the contents of the license file
   */
  getLicenseFile(): string | undefined;
}
/**
 * A service container for service objects that cen be injected to the Protector
 * object.
 */
export declare class ProtectorServices {
  /**
   * Resets the settings of `Protector` to use the normal production settings.
   * Clears the list of injected test support components.
   */
  static reset(): void;
  /**
   * Gets the object that handles random numbers.
   */
  static getRandomNumberHandler(): IRandomNumberHandler | null;
  /**
   * Injects an object that handles random numbers.
   * @param handler Random number handler object.
   * This method is used to set a fake random number handler for development time.
   * The workspace must be set up with a development license; otherwise,
   * this method raises an error.
   */
  static injectRandomNumberHandler(handler: IRandomNumberHandler): void;
  /**
   * Gets the object that handles analytics data.
   */
  static getAnalyticsHandler(): IAnalyticsHandler | null;
  /**
   * Injects an object that handles analytics data.
   * @param handler Analytics handler object.
   * This method is used both development and production time.
   */
  static injectAnalyticsHandler(handler: IAnalyticsHandler): void;
  /**
   * Gets the object that imlements the license key strore.
   */
  static getLicenseKeyStore(): ILicenseKeyStore | null;
  /**
   * Injects an object that represents a license key store.
   * @param handler License key store object.
   * This method is used in development time.
   */
  static injectLicenseKeyStore(handler: ILicenseKeyStore): void;
  /**
   * Gets the object with the application-specific PreEmptive Analytics
   * settings.
   */
  static getAnalyticsAppSettings(): AnalyticsAppSettings | null;
  /**
   * Injects an object with the application-specific PreEmptive Analytics
   * settings.
   * @param settings Setting to use with PA.
   */
  static injectAnalyticsAppSettings(settings: AnalyticsAppSettings): void;
}
export declare function getVersion(): string;
export {};