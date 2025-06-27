// this is an auto generated file, do not change this manually

import { ServiceFunction, ServiceFunctionTypes } from "@hakit/core";
declare module "@hakit/core" {
  export interface CustomSupportedServices<
    T extends ServiceFunctionTypes = "target",
  > {
    persistentNotification: {
      // Shows a notification on the notifications panel.
      create: ServiceFunction<
        object,
        T,
        {
          // Message body of the notification. @example Please check your configuration.yaml.
          message: string;
          // Optional title of the notification. @example Test notification
          title?: string;
          // ID of the notification. This new notification will overwrite an existing notification with the same ID. @example 1234
          notification_id?: string;
        }
      >;
      // Deletes a notification from the notifications panel.
      dismiss: ServiceFunction<
        object,
        T,
        {
          // ID of the notification to be deleted. @example 1234
          notification_id: string;
        }
      >;
      // Deletes all notifications from the notifications panel.
      dismissAll: ServiceFunction<object, T, object>;
    };
    homeassistant: {
      // Saves the persistent states immediately. Maintains the normal periodic saving interval.
      savePersistentStates: ServiceFunction<object, T, object>;
      // Generic action to turn devices off under any domain.
      turnOff: ServiceFunction<object, T, object>;
      // Generic action to turn devices on under any domain.
      turnOn: ServiceFunction<object, T, object>;
      // Generic action to toggle devices on/off under any domain.
      toggle: ServiceFunction<object, T, object>;
      // Stops Home Assistant.
      stop: ServiceFunction<object, T, object>;
      // Restarts Home Assistant.
      restart: ServiceFunction<object, T, object>;
      // Checks the Home Assistant YAML-configuration files for errors. Errors will be shown in the Home Assistant logs.
      checkConfig: ServiceFunction<object, T, object>;
      // Forces one or more entities to update their data.
      updateEntity: ServiceFunction<
        object,
        T,
        {
          // List of entities to force update.
          entity_id: string;
        }
      >;
      // Reloads the Core configuration from the YAML-configuration.
      reloadCoreConfig: ServiceFunction<object, T, object>;
      // Updates the Home Assistant location.
      setLocation: ServiceFunction<
        object,
        T,
        {
          // Latitude of your location. @example 32.87336 @constraints  number: mode: box, min: -90, max: 90, step: any
          latitude: number;
          // Longitude of your location. @example 117.22743 @constraints  number: mode: box, min: -180, max: 180, step: any
          longitude: number;
          // Elevation of your location above sea level. @example 120 @constraints  number: mode: box, step: any
          elevation?: number;
        }
      >;
      // Reloads Jinja2 templates found in the `custom_templates` folder in your config. New values will be applied on the next render of the template.
      reloadCustomTemplates: ServiceFunction<object, T, object>;
      // Reloads the specified config entry.
      reloadConfigEntry: ServiceFunction<
        object,
        T,
        {
          // The configuration entry ID of the entry to be reloaded. @example 8955375327824e14ba89e4b29cc3ec9a
          entry_id?: any;
        }
      >;
      // Reloads all YAML configuration that can be reloaded without restarting Home Assistant.
      reloadAll: ServiceFunction<object, T, object>;
    };
    systemLog: {
      // Deletes all log entries.
      clear: ServiceFunction<object, T, object>;
      // Write log entry.
      write: ServiceFunction<
        object,
        T,
        {
          // Message to log. @example Something went wrong
          message: string;
          // Log level.
          level?: "debug" | "info" | "warning" | "error" | "critical";
          // Logger name under which to log the message. Defaults to `system_log.external`. @example mycomponent.myplatform
          logger?: string;
        }
      >;
    };
    logger: {
      // Sets the default log level for integrations.
      setDefaultLevel: ServiceFunction<
        object,
        T,
        {
          // Default severity level for all integrations.
          level?: "debug" | "info" | "warning" | "error" | "fatal" | "critical";
        }
      >;
      // Sets the log level for one or more integrations.
      setLevel: ServiceFunction<object, T, object>;
    };
    frontend: {
      // Sets the default theme Home Assistant uses. Can be overridden by a user.
      setTheme: ServiceFunction<
        object,
        T,
        {
          // Name of a theme. @example default
          name: string;
          // Theme mode.
          mode?: "dark" | "light";
        }
      >;
      // Reloads themes from the YAML-configuration.
      reloadThemes: ServiceFunction<object, T, object>;
    };
    recorder: {
      // Starts purge task - to clean up old data from your database.
      purge: ServiceFunction<
        object,
        T,
        {
          // Number of days to keep the data in the database. Starting today, counting backward. A value of `7` means that everything older than a week will be purged. @constraints  number: min: 0, max: 365, unit_of_measurement: days
          keep_days?: number;
          // Attempt to save disk space by rewriting the entire database file.
          repack?: boolean;
          // Apply `entity_id` and `event_type` filters in addition to time-based purge.
          apply_filter?: boolean;
        }
      >;
      // Starts a purge task to remove the data related to specific entities from your database.
      purgeEntities: ServiceFunction<
        object,
        T,
        {
          // List of entities for which the data is to be removed from the Recorder database.
          entity_id?: string;
          // List of domains for which the data needs to be removed from the Recorder database. @example sun
          domains?: object;
          // List of glob patterns used to select the entities for which the data is to be removed from the Recorder database. @example domain*.object_id*
          entity_globs?: object;
          // Number of days to keep the data for rows matching the filter. Starting today, counting backward. A value of `7` means that everything older than a week will be purged. The default of 0 days will remove all matching rows immediately. @constraints  number: min: 0, max: 365, unit_of_measurement: days
          keep_days?: number;
        }
      >;
      // Starts the recording of events and state changes.
      enable: ServiceFunction<object, T, object>;
      // Stops the recording of events and state changes.
      disable: ServiceFunction<object, T, object>;
      // Retrieves statistics data for entities within a specific time period.
      getStatistics: ServiceFunction<
        object,
        T,
        {
          // The start time for the statistics query. @example 2025-01-01 00:00:00
          start_time: string;
          // The end time for the statistics query. If omitted, returns all statistics from start time onward. @example 2025-01-02 00:00:00
          end_time?: string;
          // The entity IDs or statistic IDs to return statistics for. @example sensor.energy_consumption,sensor.temperature
          statistic_ids: string;
          // The time period to group statistics by. @example hour
          period: "5minute" | "hour" | "day" | "week" | "month";
          // The types of statistics values to return. @example mean,sum
          types:
            | "change"
            | "last_reset"
            | "max"
            | "mean"
            | "min"
            | "state"
            | "sum";
          // Optional unit conversion mapping. @example [object Object]
          units?: object;
        }
      >;
    };
    hassio: {
      // Starts an add-on.
      addonStart: ServiceFunction<
        object,
        T,
        {
          // The add-on to start. @example core_ssh
          addon: string;
        }
      >;
      // Stops an add-on.
      addonStop: ServiceFunction<
        object,
        T,
        {
          // The add-on to stop. @example core_ssh
          addon: string;
        }
      >;
      // Restarts an add-on.
      addonRestart: ServiceFunction<
        object,
        T,
        {
          // The add-on to restart. @example core_ssh
          addon: string;
        }
      >;
      // Writes data to the add-on's standard input.
      addonStdin: ServiceFunction<
        object,
        T,
        {
          // The add-on to write to. @example core_ssh
          addon: string;
        }
      >;
      // Powers off the host system.
      hostShutdown: ServiceFunction<object, T, object>;
      // Reboots the host system.
      hostReboot: ServiceFunction<object, T, object>;
      // Creates a full backup.
      backupFull: ServiceFunction<
        object,
        T,
        {
          // Optional (default = current date and time). @example Backup 1
          name?: string;
          // Password to protect the backup with. @example password
          password?: string;
          // Compresses the backup files.
          compressed?: boolean;
          // Name of a backup network storage to host backups. @example my_backup_mount
          location?: string;
          // Exclude the Home Assistant database file from the backup.
          homeassistant_exclude_database?: boolean;
        }
      >;
      // Creates a partial backup.
      backupPartial: ServiceFunction<
        object,
        T,
        {
          // Includes Home Assistant settings in the backup.
          homeassistant?: boolean;
          // Exclude the Home Assistant database file from the backup.
          homeassistant_exclude_database?: boolean;
          // List of add-ons to include in the backup. Use the name slug of each add-on. @example core_ssh,core_samba,core_mosquitto
          addons?: object;
          // List of directories to include in the backup. @example homeassistant,share
          folders?: object;
          // Optional (default = current date and time). @example Partial backup 1
          name?: string;
          // Password to protect the backup with. @example password
          password?: string;
          // Compresses the backup files.
          compressed?: boolean;
          // Name of a backup network storage to host backups. @example my_backup_mount
          location?: string;
        }
      >;
      // Restores from full backup.
      restoreFull: ServiceFunction<
        object,
        T,
        {
          // Slug of backup to restore from.
          slug: string;
          // Optional password. @example password
          password?: string;
        }
      >;
      // Restores from a partial backup.
      restorePartial: ServiceFunction<
        object,
        T,
        {
          // Slug of backup to restore from.
          slug: string;
          // Restores Home Assistant.
          homeassistant?: boolean;
          // List of directories to restore from the backup. @example homeassistant,share
          folders?: object;
          // List of add-ons to restore from the backup. Use the name slug of each add-on. @example core_ssh,core_samba,core_mosquitto
          addons?: object;
          // Optional password. @example password
          password?: string;
        }
      >;
    };
    update: {
      // Installs an update for a device or service.
      install: ServiceFunction<
        object,
        T,
        {
          // The version to install. If omitted, the latest version will be installed. @example 1.0.0
          version?: string;
          // If supported by the integration, this creates a backup before starting the update.
          backup?: boolean;
        }
      >;
      // Marks currently available update as skipped.
      skip: ServiceFunction<object, T, object>;
      // Removes the skipped version marker from an update.
      clearSkipped: ServiceFunction<object, T, object>;
    };
    camera: {
      // Enables the motion detection.
      enableMotionDetection: ServiceFunction<object, T, object>;
      // Disables the motion detection.
      disableMotionDetection: ServiceFunction<object, T, object>;
      // Turns off the camera.
      turnOff: ServiceFunction<object, T, object>;
      // Turns on the camera.
      turnOn: ServiceFunction<object, T, object>;
      // Takes a snapshot from a camera.
      snapshot: ServiceFunction<
        object,
        T,
        {
          // Full path to filename. @example /tmp/snapshot_{{ entity_id.name }}.jpg
          filename: string;
        }
      >;
      // Plays the camera stream on a supported media player.
      playStream: ServiceFunction<
        object,
        T,
        {
          // Media players to stream to.
          media_player: string;
          // Stream format supported by the media player.
          format?: "hls";
        }
      >;
      // Creates a recording of a live camera feed.
      record: ServiceFunction<
        object,
        T,
        {
          // Full path to filename. Must be mp4. @example /tmp/snapshot_{{ entity_id.name }}.mp4
          filename: string;
          // Planned duration of the recording. The actual duration may vary. @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds
          duration?: number;
          // Planned lookback period to include in the recording (in addition to the duration). Only available if there is currently an active HLS stream. The actual length of the lookback period may vary. @constraints  number: min: 0, max: 300, unit_of_measurement: seconds
          lookback?: number;
        }
      >;
    };
    ffmpeg: {
      // Sends a start command to an FFmpeg-based sensor.
      start: ServiceFunction<
        object,
        T,
        {
          // Name of entity that will start. Platform dependent.
          entity_id?: string;
        }
      >;
      // Sends a stop command to an FFmpeg-based sensor.
      stop: ServiceFunction<
        object,
        T,
        {
          // Name of entity that will stop. Platform dependent.
          entity_id?: string;
        }
      >;
      // Sends a restart command to an FFmpeg-based sensor.
      restart: ServiceFunction<
        object,
        T,
        {
          // Name of entity that will restart. Platform dependent.
          entity_id?: string;
        }
      >;
    };
    group: {
      // Reloads group configuration, entities, and notify services from YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Creates/Updates a group.
      set: ServiceFunction<
        object,
        T,
        {
          // Object ID of this group. This object ID is used as part of the entity ID. Entity ID format: [domain].[object_id]. @example test_group
          object_id: string;
          // Name of the group. @example My test group
          name?: string;
          // Name of the icon for the group. @example mdi:camera
          icon?: string;
          // List of all members in the group. Cannot be used in combination with `Add entities` or `Remove entities`. @example domain.entity_id1, domain.entity_id2
          entities?: string;
          // List of members to be added to the group. Cannot be used in combination with `Entities` or `Remove entities`. @example domain.entity_id1, domain.entity_id2
          add_entities?: string;
          // List of members to be removed from a group. Cannot be used in combination with `Entities` or `Add entities`. @example domain.entity_id1, domain.entity_id2
          remove_entities?: string;
          // Enable this option if the group should only be used when all entities are in state `on`.
          all?: boolean;
        }
      >;
      // Removes a group.
      remove: ServiceFunction<
        object,
        T,
        {
          // Object ID of this group. This object ID is used as part of the entity ID. Entity ID format: [domain].[object_id]. @example test_group
          object_id: object;
        }
      >;
    };
    light: {
      // Turns on one or more lights and adjusts their properties, even when they are turned on already.
      turnOn: ServiceFunction<
        object,
        T,
        {
          // Duration it takes to get to next state. @constraints  number: min: 0, max: 300, unit_of_measurement: seconds
          transition?: number;
          // The color in RGB format. A list of three integers between 0 and 255 representing the values of red, green, and blue. @example [255, 100, 100]
          rgb_color?: [number, number, number];
          // Color temperature in Kelvin. @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: any;
          // Number indicating the percentage of full brightness, where 0 turns the light off, 1 is the minimum brightness, and 100 is the maximum brightness. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          brightness_pct?: number;
          // Change brightness by a percentage. @constraints  number: min: -100, max: 100, unit_of_measurement: %
          brightness_step_pct?: number;
          // Light effect.
          effect?: string;
          //  @example [255, 100, 100, 50]
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70]
          rgbww_color?: [number, number, number, number, number];
          //
          color_name?:
            | "homeassistant"
            | "aliceblue"
            | "antiquewhite"
            | "aqua"
            | "aquamarine"
            | "azure"
            | "beige"
            | "bisque"
            | "blanchedalmond"
            | "blue"
            | "blueviolet"
            | "brown"
            | "burlywood"
            | "cadetblue"
            | "chartreuse"
            | "chocolate"
            | "coral"
            | "cornflowerblue"
            | "cornsilk"
            | "crimson"
            | "cyan"
            | "darkblue"
            | "darkcyan"
            | "darkgoldenrod"
            | "darkgray"
            | "darkgreen"
            | "darkgrey"
            | "darkkhaki"
            | "darkmagenta"
            | "darkolivegreen"
            | "darkorange"
            | "darkorchid"
            | "darkred"
            | "darksalmon"
            | "darkseagreen"
            | "darkslateblue"
            | "darkslategray"
            | "darkslategrey"
            | "darkturquoise"
            | "darkviolet"
            | "deeppink"
            | "deepskyblue"
            | "dimgray"
            | "dimgrey"
            | "dodgerblue"
            | "firebrick"
            | "floralwhite"
            | "forestgreen"
            | "fuchsia"
            | "gainsboro"
            | "ghostwhite"
            | "gold"
            | "goldenrod"
            | "gray"
            | "green"
            | "greenyellow"
            | "grey"
            | "honeydew"
            | "hotpink"
            | "indianred"
            | "indigo"
            | "ivory"
            | "khaki"
            | "lavender"
            | "lavenderblush"
            | "lawngreen"
            | "lemonchiffon"
            | "lightblue"
            | "lightcoral"
            | "lightcyan"
            | "lightgoldenrodyellow"
            | "lightgray"
            | "lightgreen"
            | "lightgrey"
            | "lightpink"
            | "lightsalmon"
            | "lightseagreen"
            | "lightskyblue"
            | "lightslategray"
            | "lightslategrey"
            | "lightsteelblue"
            | "lightyellow"
            | "lime"
            | "limegreen"
            | "linen"
            | "magenta"
            | "maroon"
            | "mediumaquamarine"
            | "mediumblue"
            | "mediumorchid"
            | "mediumpurple"
            | "mediumseagreen"
            | "mediumslateblue"
            | "mediumspringgreen"
            | "mediumturquoise"
            | "mediumvioletred"
            | "midnightblue"
            | "mintcream"
            | "mistyrose"
            | "moccasin"
            | "navajowhite"
            | "navy"
            | "navyblue"
            | "oldlace"
            | "olive"
            | "olivedrab"
            | "orange"
            | "orangered"
            | "orchid"
            | "palegoldenrod"
            | "palegreen"
            | "paleturquoise"
            | "palevioletred"
            | "papayawhip"
            | "peachpuff"
            | "peru"
            | "pink"
            | "plum"
            | "powderblue"
            | "purple"
            | "red"
            | "rosybrown"
            | "royalblue"
            | "saddlebrown"
            | "salmon"
            | "sandybrown"
            | "seagreen"
            | "seashell"
            | "sienna"
            | "silver"
            | "skyblue"
            | "slateblue"
            | "slategray"
            | "slategrey"
            | "snow"
            | "springgreen"
            | "steelblue"
            | "tan"
            | "teal"
            | "thistle"
            | "tomato"
            | "turquoise"
            | "violet"
            | "wheat"
            | "white"
            | "whitesmoke"
            | "yellow"
            | "yellowgreen";
          //  @example [300, 70]
          hs_color?: [number, number];
          //  @example [0.52, 0.43]
          xy_color?: [number, number];
          //  @constraints  color_temp: unit: mired, min: 153, max: 500
          color_temp?: number | object;
          //  @constraints  number: min: 0, max: 255
          brightness?: number;
          //  @constraints  number: min: -225, max: 255
          brightness_step?: number;
          //
          white?: boolean;
          //  @example relax
          profile?: string;
          //
          flash?: "long" | "short";
        }
      >;
      // Turns off one or more lights.
      turnOff: ServiceFunction<
        object,
        T,
        {
          // Duration it takes to get to next state. @constraints  number: min: 0, max: 300, unit_of_measurement: seconds
          transition?: number;
          //
          flash?: "long" | "short";
        }
      >;
      // Toggles one or more lights, from on to off, or off to on, based on their current state.
      toggle: ServiceFunction<
        object,
        T,
        {
          // Duration it takes to get to next state. @constraints  number: min: 0, max: 300, unit_of_measurement: seconds
          transition?: number;
          // The color in RGB format. A list of three integers between 0 and 255 representing the values of red, green, and blue. @example [255, 100, 100]
          rgb_color?: [number, number, number];
          // Color temperature in Kelvin. @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: any;
          // Number indicating the percentage of full brightness, where 0 turns the light off, 1 is the minimum brightness, and 100 is the maximum brightness. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          brightness_pct?: number;
          // Light effect.
          effect?: string;
          //  @example [255, 100, 100, 50]
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70]
          rgbww_color?: [number, number, number, number, number];
          //
          color_name?:
            | "homeassistant"
            | "aliceblue"
            | "antiquewhite"
            | "aqua"
            | "aquamarine"
            | "azure"
            | "beige"
            | "bisque"
            | "blanchedalmond"
            | "blue"
            | "blueviolet"
            | "brown"
            | "burlywood"
            | "cadetblue"
            | "chartreuse"
            | "chocolate"
            | "coral"
            | "cornflowerblue"
            | "cornsilk"
            | "crimson"
            | "cyan"
            | "darkblue"
            | "darkcyan"
            | "darkgoldenrod"
            | "darkgray"
            | "darkgreen"
            | "darkgrey"
            | "darkkhaki"
            | "darkmagenta"
            | "darkolivegreen"
            | "darkorange"
            | "darkorchid"
            | "darkred"
            | "darksalmon"
            | "darkseagreen"
            | "darkslateblue"
            | "darkslategray"
            | "darkslategrey"
            | "darkturquoise"
            | "darkviolet"
            | "deeppink"
            | "deepskyblue"
            | "dimgray"
            | "dimgrey"
            | "dodgerblue"
            | "firebrick"
            | "floralwhite"
            | "forestgreen"
            | "fuchsia"
            | "gainsboro"
            | "ghostwhite"
            | "gold"
            | "goldenrod"
            | "gray"
            | "green"
            | "greenyellow"
            | "grey"
            | "honeydew"
            | "hotpink"
            | "indianred"
            | "indigo"
            | "ivory"
            | "khaki"
            | "lavender"
            | "lavenderblush"
            | "lawngreen"
            | "lemonchiffon"
            | "lightblue"
            | "lightcoral"
            | "lightcyan"
            | "lightgoldenrodyellow"
            | "lightgray"
            | "lightgreen"
            | "lightgrey"
            | "lightpink"
            | "lightsalmon"
            | "lightseagreen"
            | "lightskyblue"
            | "lightslategray"
            | "lightslategrey"
            | "lightsteelblue"
            | "lightyellow"
            | "lime"
            | "limegreen"
            | "linen"
            | "magenta"
            | "maroon"
            | "mediumaquamarine"
            | "mediumblue"
            | "mediumorchid"
            | "mediumpurple"
            | "mediumseagreen"
            | "mediumslateblue"
            | "mediumspringgreen"
            | "mediumturquoise"
            | "mediumvioletred"
            | "midnightblue"
            | "mintcream"
            | "mistyrose"
            | "moccasin"
            | "navajowhite"
            | "navy"
            | "navyblue"
            | "oldlace"
            | "olive"
            | "olivedrab"
            | "orange"
            | "orangered"
            | "orchid"
            | "palegoldenrod"
            | "palegreen"
            | "paleturquoise"
            | "palevioletred"
            | "papayawhip"
            | "peachpuff"
            | "peru"
            | "pink"
            | "plum"
            | "powderblue"
            | "purple"
            | "red"
            | "rosybrown"
            | "royalblue"
            | "saddlebrown"
            | "salmon"
            | "sandybrown"
            | "seagreen"
            | "seashell"
            | "sienna"
            | "silver"
            | "skyblue"
            | "slateblue"
            | "slategray"
            | "slategrey"
            | "snow"
            | "springgreen"
            | "steelblue"
            | "tan"
            | "teal"
            | "thistle"
            | "tomato"
            | "turquoise"
            | "violet"
            | "wheat"
            | "white"
            | "whitesmoke"
            | "yellow"
            | "yellowgreen";
          //  @example [300, 70]
          hs_color?: [number, number];
          //  @example [0.52, 0.43]
          xy_color?: [number, number];
          //  @constraints  color_temp: unit: mired, min: 153, max: 500
          color_temp?: number | object;
          //  @constraints  number: min: 0, max: 255
          brightness?: number;
          //
          white?: boolean;
          //  @example relax
          profile?: string;
          //
          flash?: "long" | "short";
        }
      >;
    };
    backup: {
      // Creates a new backup with automatic backup settings.
      createAutomatic: ServiceFunction<object, T, object>;
    };
    googleAssistant: {
      // Sends a request_sync command to Google.
      requestSync: ServiceFunction<
        object,
        T,
        {
          // Only needed for automations. Specific Home Assistant user ID (not username, ID in Settings > People > Users > under username) to sync with Google Assistant. Not needed when you use this action through Home Assistant frontend or API. Used in automation, script or other place where context.user_id is missing.
          agent_user_id?: string;
        }
      >;
    };
    conversation: {
      // Launches a conversation from a transcribed text.
      process: ServiceFunction<
        object,
        T,
        {
          // Transcribed text input. @example Turn all lights on
          text: string;
          // Language of text. Defaults to server language. @example NL
          language?: string;
          // Conversation agent to process your request. The conversation agent is the brains of your assistant. It processes the incoming text commands. @example homeassistant
          agent_id?: string;
          // ID of the conversation, to be able to continue a previous conversation @example my_conversation_1
          conversation_id?: string;
        }
      >;
      // Reloads the intent configuration.
      reload: ServiceFunction<
        object,
        T,
        {
          // Language to clear cached intents for. Defaults to server language. @example NL
          language?: string;
          // Conversation agent to reload. @example homeassistant
          agent_id?: string;
        }
      >;
    };
    trend: {
      // Reloads trend sensors from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
    };
    template: {
      // Reloads template entities from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
    };
    button: {
      // Press the button entity.
      press: ServiceFunction<object, T, object>;
    };
    tts: {
      // Speaks something using text-to-speech on a media player.
      speak: ServiceFunction<
        object,
        T,
        {
          // Media players to play the message.
          media_player_entity_id: string;
          // The text you want to convert into speech so that you can listen to it on your device. @example My name is hanna
          message: string;
          // Stores this message locally so that when the text is requested again, the output can be produced more quickly.
          cache?: boolean;
          // Language to use for speech generation. @example ru
          language?: string;
          // A dictionary containing integration-specific options. @example platform specific
          options?: object;
        }
      >;
      // Removes all cached text-to-speech files and purges the memory.
      clearCache: ServiceFunction<object, T, object>;
      // Say something using text-to-speech on a media player with google_translate.
      googleTranslateSay: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example My name is hanna
          message: string;
          //
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific
          options?: object;
        }
      >;
      // Say something using text-to-speech on a media player with cloud.
      cloudSay: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example My name is hanna
          message: string;
          //
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific
          options?: object;
        }
      >;
    };
    cloud: {
      // Makes the instance UI accessible from outside of the local network by enabling your Home Assistant Cloud connection.
      remoteConnect: ServiceFunction<object, T, object>;
      // Disconnects the instance UI from Home Assistant Cloud. This disables access to it from outside your local network.
      remoteDisconnect: ServiceFunction<object, T, object>;
    };
    fan: {
      // Turns fan on.
      turnOn: ServiceFunction<
        object,
        T,
        {
          // Speed of the fan. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          percentage?: number;
          // Preset fan mode. @example auto
          preset_mode?: string;
        }
      >;
      // Turns fan off.
      turnOff: ServiceFunction<object, T, object>;
      // Toggles a fan on/off.
      toggle: ServiceFunction<object, T, object>;
      // Increases the speed of a fan.
      increaseSpeed: ServiceFunction<
        object,
        T,
        {
          // Percentage step by which the speed should be increased. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          percentage_step?: number;
        }
      >;
      // Decreases the speed of a fan.
      decreaseSpeed: ServiceFunction<
        object,
        T,
        {
          // Percentage step by which the speed should be decreased. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          percentage_step?: number;
        }
      >;
      // Controls the oscillation of a fan.
      oscillate: ServiceFunction<
        object,
        T,
        {
          // Turns oscillation on/off.
          oscillating: boolean;
        }
      >;
      // Sets a fan's rotation direction.
      setDirection: ServiceFunction<
        object,
        T,
        {
          // Direction of the fan rotation.
          direction: "forward" | "reverse";
        }
      >;
      // Sets the speed of a fan.
      setPercentage: ServiceFunction<
        object,
        T,
        {
          // Speed of the fan. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          percentage: number;
        }
      >;
      // Sets preset fan mode.
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          // Preset fan mode. @example auto
          preset_mode: string;
        }
      >;
    };
    scene: {
      // Reloads the scenes from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Activates a scene with configuration.
      apply: ServiceFunction<
        object,
        T,
        {
          // List of entities and their target state. @example light.kitchen: 'on' light.ceiling:   state: 'on'   brightness: 80
          entities: object;
          // Time it takes the devices to transition into the states defined in the scene. @constraints  number: min: 0, max: 300, unit_of_measurement: seconds
          transition?: number;
        }
      >;
      // Creates a new scene.
      create: ServiceFunction<
        object,
        T,
        {
          // The entity ID of the new scene. @example all_lights
          scene_id: string;
          // List of entities and their target state. If your entities are already in the target state right now, use 'Entities snapshot' instead. @example light.tv_back_light: 'on' light.ceiling:   state: 'on'   brightness: 200
          entities?: object;
          // List of entities to be included in the snapshot. By taking a snapshot, you record the current state of those entities. If you do not want to use the current state of all your entities for this scene, you can combine 'Entities snapshot' with 'Entity states'. @example - light.ceiling - light.kitchen
          snapshot_entities?: string;
        }
      >;
      // Deletes a dynamically created scene.
      delete: ServiceFunction<object, T, object>;
      // Activates a scene.
      turnOn: ServiceFunction<
        object,
        T,
        {
          // Time it takes the devices to transition into the states defined in the scene. @constraints  number: min: 0, max: 300, unit_of_measurement: seconds
          transition?: number;
        }
      >;
    };
    cover: {
      // Opens a cover.
      openCover: ServiceFunction<object, T, object>;
      // Closes a cover.
      closeCover: ServiceFunction<object, T, object>;
      // Moves a cover to a specific position.
      setCoverPosition: ServiceFunction<
        object,
        T,
        {
          // Target position. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          position: number;
        }
      >;
      // Stops the cover movement.
      stopCover: ServiceFunction<object, T, object>;
      // Toggles a cover open/closed.
      toggle: ServiceFunction<object, T, object>;
      // Tilts a cover open.
      openCoverTilt: ServiceFunction<object, T, object>;
      // Tilts a cover to close.
      closeCoverTilt: ServiceFunction<object, T, object>;
      // Stops a tilting cover movement.
      stopCoverTilt: ServiceFunction<object, T, object>;
      // Moves a cover tilt to a specific position.
      setCoverTiltPosition: ServiceFunction<
        object,
        T,
        {
          // Target tilt positition. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          tilt_position: number;
        }
      >;
      // Toggles a cover tilt open/closed.
      toggleCoverTilt: ServiceFunction<object, T, object>;
    };
    logbook: {
      // Creates a custom entry in the logbook.
      log: ServiceFunction<
        object,
        T,
        {
          // Custom name for an entity, can be referenced using the 'Entity ID' field. @example Kitchen
          name: string;
          // Message of the logbook entry. @example is being used
          message: string;
          // Entity to reference in the logbook entry.
          entity_id?: string;
          // Determines which icon is used in the logbook entry. The icon illustrates the integration domain related to this logbook entry. @example light
          domain?: string;
        }
      >;
    };
    timer: {
      // Reloads timers from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Starts a timer or restarts it with a provided duration.
      start: ServiceFunction<
        object,
        T,
        {
          // Custom duration to restart the timer with. @example 00:01:00 or 60
          duration?: string;
        }
      >;
      // Pauses a running timer, retaining the remaining duration for later continuation.
      pause: ServiceFunction<object, T, object>;
      // Resets a timer's duration to the last known initial value without firing the timer finished event.
      cancel: ServiceFunction<object, T, object>;
      // Finishes a running timer earlier than scheduled.
      finish: ServiceFunction<object, T, object>;
      // Changes a timer by adding or subtracting a given duration.
      change: ServiceFunction<
        object,
        T,
        {
          // Duration to add to or subtract from the running timer. @example 00:01:00, 60 or -60
          duration: string;
        }
      >;
    };
    inputNumber: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Sets the value.
      setValue: ServiceFunction<
        object,
        T,
        {
          // The target value. @constraints  number: min: 0, max: 9223372036854776000, step: 0.001, mode: box
          value: number;
        }
      >;
      // Increments the current value by 1 step.
      increment: ServiceFunction<object, T, object>;
      // Decrements the current value by 1 step.
      decrement: ServiceFunction<object, T, object>;
    };
    zone: {
      // Reloads zones from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
    };
    inputBoolean: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Turns on the helper.
      turnOn: ServiceFunction<object, T, object>;
      // Turns off the helper.
      turnOff: ServiceFunction<object, T, object>;
      // Toggles the helper on/off.
      toggle: ServiceFunction<object, T, object>;
    };
    inputSelect: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Selects the first option.
      selectFirst: ServiceFunction<object, T, object>;
      // Selects the last option.
      selectLast: ServiceFunction<object, T, object>;
      // Selects the next option.
      selectNext: ServiceFunction<
        object,
        T,
        {
          // If the option should cycle from the last to the first option on the list.
          cycle?: boolean;
        }
      >;
      // Selects an option.
      selectOption: ServiceFunction<
        object,
        T,
        {
          // Option to be selected. @example 'Item A'
          option: string;
        }
      >;
      // Selects the previous option.
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          // If the option should cycle from the first to the last option on the list.
          cycle?: boolean;
        }
      >;
      // Sets the options.
      setOptions: ServiceFunction<
        object,
        T,
        {
          // List of options. @example ['Item A', 'Item B', 'Item C']
          options: string;
        }
      >;
    };
    inputButton: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Mimics the physical button press on the device.
      press: ServiceFunction<object, T, object>;
    };
    person: {
      // Reloads persons from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
    };
    schedule: {
      // Reloads schedules from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Retrieves the configured time ranges of one or multiple schedules.
      getSchedule: ServiceFunction<object, T, object>;
    };
    commandLine: {
      // Reloads command line configuration from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
    };
    script: {
      //
      1638709314016: ServiceFunction<object, T, object>;
      //
      castCameraToDrivewayMonitor: ServiceFunction<object, T, object>;
      //
      turnOffAllLights: ServiceFunction<object, T, object>;
      //
      ventilationOnFullSpeed: ServiceFunction<object, T, object>;
      //
      turnVentilationOff: ServiceFunction<object, T, object>;
      //
      goodMorning: ServiceFunction<object, T, object>;
      //
      toggleVentilation: ServiceFunction<object, T, object>;
      //
      timedBedroomFan: ServiceFunction<object, T, object>;
      //
      showHaSettingsOnTablet: ServiceFunction<object, T, object>;
      //
      startEufyVoordeurStream: ServiceFunction<object, T, object>;
      // Reloads all the available scripts.
      reload: ServiceFunction<object, T, object>;
      // Runs the sequence of actions defined in a script.
      turnOn: ServiceFunction<object, T, object>;
      // Stops a running script.
      turnOff: ServiceFunction<object, T, object>;
      // Starts a script if it isn't running, stops it otherwise.
      toggle: ServiceFunction<object, T, object>;
    };
    mqtt: {
      // Publishes a message to an MQTT topic.
      publish: ServiceFunction<
        object,
        T,
        {
          // Topic to publish to. @example /homeassistant/hello
          topic: string;
          // The payload to publish. Publishes an empty message if not provided. @example The temperature is {{ states('sensor.temperature') }}
          payload?: any;
          // If 'Payload' is a Python bytes literal, evaluate the bytes literal and publish the raw data.
          evaluate_payload?: boolean;
          // Quality of Service to use. 0: At most once. 1: At least once. 2: Exactly once.
          qos?: "0" | "1" | "2";
          // If the message should have the retain flag set. If set, the broker stores the most recent message on a topic.
          retain?: boolean;
        }
      >;
      // Writes all messages on a specific topic into the `mqtt_dump.txt` file in your configuration folder.
      dump: ServiceFunction<
        object,
        T,
        {
          // Topic to listen to. @example OpenZWave/#
          topic?: string;
          // How long we should listen for messages in seconds. @constraints  number: min: 1, max: 300, unit_of_measurement: seconds
          duration?: number;
        }
      >;
      // Reloads MQTT entities from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
    };
    openaiConversation: {
      // Sends a conversational query to ChatGPT including any attached image or PDF files
      generateContent: ServiceFunction<
        object,
        T,
        {
          // The config entry to use for this action @constraints  config_entry: integration: openai_conversation
          config_entry: any;
          // The prompt to send @example Hello, how can I help you?
          prompt: string;
          // List of files to upload @example - /path/to/file1.txt - /path/to/file2.txt
          filenames?: string;
        }
      >;
      // Turns a prompt into an image
      generateImage: ServiceFunction<
        object,
        T,
        {
          // The config entry to use for this action @constraints  config_entry: integration: openai_conversation
          config_entry: any;
          // The text to turn into an image @example A photo of a dog
          prompt: string;
          // The size of the image to generate @example 1024x1024
          size?: "1024x1024" | "1024x1792" | "1792x1024";
          // The quality of the image that will be generated @example standard
          quality?: "standard" | "hd";
          // The style of the generated image @example vivid
          style?: "vivid" | "natural";
        }
      >;
    };
    wakeOnLan: {
      // Sends a 'magic packet' to wake up a device with 'Wake-On-LAN' capabilities.
      sendMagicPacket: ServiceFunction<
        object,
        T,
        {
          // MAC address of the device to wake up. @example aa:bb:cc:dd:ee:ff
          mac: string;
          // The IP address of the host to send the magic packet to. Defaults to `255.255.255.255` and is normally not changed. @example 192.168.255.255
          broadcast_address?: string;
          // The port to send the magic packet to. Defaults to `9` and is normally not changed. @constraints  number: min: 1, max: 65535, mode: box
          broadcast_port?: number;
        }
      >;
    };
    tado: {
      // Adds a meter reading to Tado Energy IQ.
      addMeterReading: ServiceFunction<
        object,
        T,
        {
          // Config entry to add meter reading to. @constraints  config_entry: integration: tado
          config_entry: any;
          // Reading in m³ or kWh without decimals. @constraints  number: mode: box, min: 0, step: 1
          reading: number;
        }
      >;
      // Turns on water heater for a set time.
      setWaterHeaterTimer: ServiceFunction<
        object,
        T,
        {
          // Set the time period for the boost. @example 01:30:00
          time_period: string;
          // Temperature to set heater to. @constraints  number: min: 0, max: 100, step: 0.5, unit_of_measurement: °
          temperature?: number;
        }
      >;
      // Turns on climate entities for a set time.
      setClimateTimer: ServiceFunction<
        object,
        T,
        {
          // Temperature to set climate entity to. @constraints  number: min: 0, max: 100, step: 0.5, unit_of_measurement: °
          temperature: number;
          // Choose this or 'Overlay'. Set the time period for the change if you want to be specific. @example 01:30:00
          time_period?: string;
          // Choose this or 'Time period'. Allows you to choose an overlay. MANUAL:=Overlay until user removes; NEXT_TIME_BLOCK:=Overlay until next timeblock; TADO_DEFAULT:=Overlay based on Tado app setting. @example MANUAL
          requested_overlay?: "NEXT_TIME_BLOCK" | "MANUAL" | "TADO_DEFAULT";
        }
      >;
      // Sets the temperature offset of climate entities.
      setClimateTemperatureOffset: ServiceFunction<
        object,
        T,
        {
          // Offset you would like (depending on your device). @constraints  number: min: -10, max: 10, step: 0.01, unit_of_measurement: °
          offset?: number;
        }
      >;
    };
    counter: {
      // Increments a counter by its step size.
      increment: ServiceFunction<object, T, object>;
      // Decrements a counter by its step size.
      decrement: ServiceFunction<object, T, object>;
      // Resets a counter to its initial value.
      reset: ServiceFunction<object, T, object>;
      // Sets the counter to a specific value.
      setValue: ServiceFunction<
        object,
        T,
        {
          // The new counter value the entity should be set to. @constraints  number: min: 0, max: 9223372036854776000, mode: box
          value: number;
        }
      >;
    };
    uiLovelaceMinimalist: {
      // Reload dashboard configuration for UI Lovelace Minimalist.
      reload: ServiceFunction<object, T, object>;
    };
    cast: {
      // Shows a dashboard view on a Chromecast device.
      showLovelaceView: ServiceFunction<
        object,
        T,
        {
          // Media player entity to show the dashboard view on.
          entity_id: string;
          // The URL path of the dashboard to show, defaults to lovelace if not specified. @example lovelace-cast
          dashboard_path?: string;
          // The URL path of the dashboard view to show. @example downstairs
          view_path: string;
        }
      >;
    };
    inputText: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Sets the value.
      setValue: ServiceFunction<
        object,
        T,
        {
          // The target value. @example This is an example text
          value: string;
        }
      >;
    };
    musicAssistant: {
      // Performs a global search on the Music Assistant library and all providers.
      search: ServiceFunction<
        object,
        T,
        {
          // Select the Music Assistant instance to perform the search on. @constraints  config_entry: integration: music_assistant
          config_entry_id: any;
          // The name/title to search for. @example We Are The Champions
          name: string;
          // The type of the content to search. Such as artist, album, track, radio, or playlist. All types if omitted. @example playlist
          media_type?:
            | "artist"
            | "album"
            | "audiobook"
            | "playlist"
            | "podcast"
            | "track"
            | "radio";
          // When specifying a track or album name in the name field, you can optionally restrict results by this artist name. @example Queen
          artist?: string;
          // When specifying a track name in the name field, you can optionally restrict results by this album name. @example News of the world
          album?: string;
          // Maximum number of items to return (per media type). @example 25 @constraints  number: min: 1, max: 100, step: 1
          limit?: number;
          // Only include results that are in the library. @example true
          library_only?: boolean;
        }
      >;
      // Retrieves items from a Music Assistant library.
      getLibrary: ServiceFunction<
        object,
        T,
        {
          // Select the Music Assistant instance to perform the search on. @constraints  config_entry: integration: music_assistant
          config_entry_id: any;
          // The media type for which to request details for. @example playlist
          media_type:
            | "artist"
            | "album"
            | "audiobook"
            | "playlist"
            | "podcast"
            | "track"
            | "radio";
          // Filter items so only favorites items are returned. @example true
          favorite?: boolean;
          // Optional search string to search through this library. @example We Are The Champions
          search?: string;
          // Maximum number of items to return. @example 25 @constraints  number: min: 1, max: 500, step: 1
          limit?: number;
          // Offset to start the list from. @example 25 @constraints  number: min: 1, max: 1000000, step: 1
          offset?: number;
          // Sort the list by this field. @example random
          order_by?:
            | "name"
            | "name_desc"
            | "sort_name"
            | "sort_name_desc"
            | "timestamp_added"
            | "timestamp_added_desc"
            | "last_played"
            | "last_played_desc"
            | "play_count"
            | "play_count_desc"
            | "year"
            | "year_desc"
            | "position"
            | "position_desc"
            | "artist_name"
            | "artist_name_desc"
            | "random"
            | "random_play_count";
          // Filter albums by type. @example single
          album_type?: "album" | "single" | "compilation" | "ep" | "unknown";
          // Only return album artists when listing the artists library items. @example true
          album_artists_only?: boolean;
        }
      >;
      // Plays media on a Music Assistant player with more fine-grained control options.
      playMedia: ServiceFunction<
        object,
        T,
        {
          // URI or name of the item you want to play. Specify a list if you want to play/enqueue multiple items. @example spotify://playlist/aabbccddeeff
          media_id: object;
          // The type of the content to play. Such as artist, album, track or playlist. Will be auto-determined if omitted. @example playlist
          media_type?:
            | "artist"
            | "album"
            | "audiobook"
            | "folder"
            | "playlist"
            | "podcast"
            | "track"
            | "radio";
          // When specifying a track or album by name in the Media ID field, you can optionally restrict results by this artist name. @example Queen
          artist?: string;
          // When specifying a track by name in the Media ID field, you can optionally restrict results by this album name. @example News of the world
          album?: string;
          // If the content should be played now or added to the queue.
          enqueue?: "play" | "replace" | "next" | "replace_next" | "add";
          // Enable radio mode to auto-generate a playlist based on the selection.
          radio_mode?: boolean;
        }
      >;
      // Plays an announcement on a Music Assistant player with more fine-grained control options.
      playAnnouncement: ServiceFunction<
        object,
        T,
        {
          // URL to the notification sound. @example http://someremotesite.com/doorbell.mp3
          url: string;
          // Use pre-announcement sound for the announcement. Omit to use the player default. @example true
          use_pre_announce?: boolean;
          // Use a forced volume level for the announcement. Omit to use player default. @example 75 @constraints  number: min: 1, max: 100, step: 1
          announce_volume?: number;
        }
      >;
      // Transfers a player's queue to another player.
      transferQueue: ServiceFunction<
        object,
        T,
        {
          // The source media player which has the queue you want to transfer. When omitted, the first playing player will be used.
          source_player?: string;
          // Start playing the queue on the target player. Omit to use the default behavior. @example true
          auto_play?: boolean;
        }
      >;
      // Retrieves the details of the currently active queue of a Music Assistant player.
      getQueue: ServiceFunction<object, T, object>;
    };
    webrtc: {
      // Create a temporary or permanent link to a stream (enter `url` or `entity`)
      createLink: ServiceFunction<
        object,
        T,
        {
          // Create a random or permanent ID for your link @example fd0a53ca-e9ab-4e7a-86a2-441642b16ae1
          link_id: string;
          // Link to RTSP-stream @example rtsp://rtsp:12345678@192.168.1.123:554/av_stream/ch0
          url?: string;
          // Camera entity_id @example camera.generic_stream
          entity?: string;
          // How many times a link can be opened (0 - unlimit) @constraints  number: min: 0, max: 100, unit_of_measurement: times
          open_limit?: number;
          // How many seconds will the link live (0 - unlimit) @constraints  number: min: 0, max: 100000, unit_of_measurement: seconds
          time_to_live?: number;
        }
      >;
      // Cast stream to Chromecast device via DashCast application
      dashCast: ServiceFunction<
        object,
        T,
        {
          // Media player entity_id @example media_player.mibox4
          entity_id: string;
          // Link to RTSP-stream @example rtsp://rtsp:12345678@192.168.1.123:554/av_stream/ch0
          url?: string;
          // Camera entity_id @example camera.generic_stream
          entity?: string;
          // Additional card params
          extra?: object;
          // Force restart DashCast application
          force?: boolean;
          // Manual base URL to Hass server @example http://192.168.1.123:8123
          hass_url?: string;
        }
      >;
    };
    inputDatetime: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<object, T, object>;
      // Sets the date and/or time.
      setDatetime: ServiceFunction<
        object,
        T,
        {
          // The target date. @example '2019-04-20'
          date?: string;
          // The target time. @example '05:04:20'
          time?: string;
          // The target date & time. @example '2019-04-20 05:04:20'
          datetime?: string;
          // The target date & time, expressed by a UNIX timestamp. @constraints  number: min: 0, max: 9223372036854776000, mode: box
          timestamp?: number;
        }
      >;
    };
    notify: {
      // Sends a notification message.
      sendMessage: ServiceFunction<
        object,
        T,
        {
          // Your notification message.
          message: string;
          // Title for your notification message.
          title?: string;
        }
      >;
      // Sends a notification that is visible in the notifications panel.
      persistentNotification: ServiceFunction<
        object,
        T,
        {
          // Message body of the notification. @example The garage door has been open for 10 minutes.
          message: string;
          // Title of the notification. @example Your Garage Door Friend
          title?: string;
          // Some integrations provide extended functionality via this field. For more information, refer to the integration documentation. @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_renss_iphone integration.
      mobileAppRenssIphone: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_galaxy_watch5_yr0h integration.
      mobileAppGalaxyWatch5Yr0H: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_xiaomi_pad_5 integration.
      mobileAppXiaomiPad5: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_volvo integration.
      mobileAppVolvo: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_pixel_5 integration.
      mobileAppPixel5: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_pixel_9 integration.
      mobileAppPixel9: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the notify service.
      notify: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the google_assistant_sdk service.
      googleAssistantSdk: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the lg_c8 service.
      lgC8: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific
          target?: object;
          //  @example platform specific
          data?: object;
        }
      >;
    };
    deviceTracker: {
      // Manually update the records of a seen legacy device tracker in the known_devices.yaml file.
      see: ServiceFunction<
        object,
        T,
        {
          // MAC address of the device. @example FF:FF:FF:FF:FF:FF
          mac?: string;
          // ID of the device (find the ID in `known_devices.yaml`). @example phonedave
          dev_id?: string;
          // Hostname of the device. @example Dave
          host_name?: string;
          // Name of the location where the device is located. The options are: `home`, `not_home`, or the name of the zone. @example home
          location_name?: string;
          // GPS coordinates where the device is located, specified by latitude and longitude (for example: [51.513845, -0.100539]). @example [51.509802, -0.086692]
          gps?: object;
          // Accuracy of the GPS coordinates. @constraints  number: min: 0, mode: box, unit_of_measurement: m
          gps_accuracy?: number;
          // Battery level of the device. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          battery?: number;
        }
      >;
    };
    eufySecurity: {
      // Pull latest data from cloud and update internal state
      forceSync: ServiceFunction<object, T, object>;
      // Send a JSON message to Web Socket
      sendMessage: ServiceFunction<
        object,
        T,
        {
          // Raw message in JSON format
          message: string;
        }
      >;
      // Set Log Level of Add-on, this is needed to debug issues happening in eufy-security-ws add-on. Before calling a problematic command, set the log level (preferable to debug), execute your command and revert it back to info.
      setLogLevel: ServiceFunction<
        object,
        T,
        {
          // Log Level Option
          log_level:
            | "silly"
            | "trace"
            | "debug"
            | "info"
            | "warn"
            | "error"
            | "fatal";
        }
      >;
      // Trigger Alarm for a Duration
      triggerBaseAlarmWithDuration: ServiceFunction<
        object,
        T,
        {
          // Duration in seconds @example 10 @constraints  number: min: 0, max: 300
          duration: number;
        }
      >;
      // Reset Alarm for Alarm Panel
      resetAlarm: ServiceFunction<object, T, object>;
      // Arm Customer 1 for Alarm Panel
      alarmArmCustom1: ServiceFunction<object, T, object>;
      // Arm Customer 2 for Alarm Panel
      alarmArmCustom2: ServiceFunction<object, T, object>;
      // Arm Customer 3 for Alarm Panel
      alarmArmCustom3: ServiceFunction<object, T, object>;
      // Switch to geofence mode
      geofence: ServiceFunction<object, T, object>;
      // Switch to schedule mode
      schedule: ServiceFunction<object, T, object>;
      // Only supported if no doorbell device is registered at the station where the chime is to be performed
      chime: ServiceFunction<
        object,
        T,
        {
          // Ringtone ID? @example 419 @constraints  number: min: 0, max: 999999
          ringtone: number;
        }
      >;
      // Reboot station
      reboot: ServiceFunction<object, T, object>;
      // Turn Alarm off for Alarm Panel
      alarmOff: ServiceFunction<object, T, object>;
      // Generate Image for Camera
      generateImage: ServiceFunction<object, T, object>;
      // Send start live stream command to camera
      startP2PLivestream: ServiceFunction<object, T, object>;
      // Send stop live stream command to camera
      stopP2PLivestream: ServiceFunction<object, T, object>;
      // Send start live stream command to camera
      startRtspLivestream: ServiceFunction<object, T, object>;
      // Send stop live stream command to camera
      stopRtspLivestream: ServiceFunction<object, T, object>;
      // Call PTZ command for supported PTZ cameras
      ptz: ServiceFunction<
        object,
        T,
        {
          // Direction Option
          direction: "ROTATE360" | "DOWN" | "UP" | "RIGHT" | "LEFT";
        }
      >;
      // Look up for supported PTZ cameras
      ptzUp: ServiceFunction<object, T, object>;
      // Look down for supported PTZ cameras
      ptzDown: ServiceFunction<object, T, object>;
      // Look left for supported PTZ cameras
      ptzLeft: ServiceFunction<object, T, object>;
      // Look right for supported PTZ cameras
      ptzRight: ServiceFunction<object, T, object>;
      // Rotate 360 degrees for supported PTZ cameras
      ptz360: ServiceFunction<object, T, object>;
      // Set a preset position for supported cameras
      presetPosition: ServiceFunction<
        object,
        T,
        {
          // Position Option @constraints  number: min: 0, max: 3
          position: number;
        }
      >;
      // Save a new preset position for supported cameras
      savePresetPosition: ServiceFunction<
        object,
        T,
        {
          // Position Option @constraints  number: min: 0, max: 3
          position: number;
        }
      >;
      // Delete an existing preset position for supported cameras
      deletePresetPosition: ServiceFunction<
        object,
        T,
        {
          // Position Option @constraints  number: min: 0, max: 3
          position: number;
        }
      >;
      // Calibrate supported cameras
      calibrate: ServiceFunction<object, T, object>;
      // Trigger Alarm for a Duration
      triggerCameraAlarmWithDuration: ServiceFunction<
        object,
        T,
        {
          // Duration in seconds @example 10 @constraints  number: min: 0, max: 300
          duration: number;
        }
      >;
      // Send quick response, this works ONLY when camera is streaming via P2P (not RTSP)
      quickResponse: ServiceFunction<
        object,
        T,
        {
          // Voice ID stored in attributes @example 419 @constraints  number: min: 0, max: 999999
          voice_id: number;
        }
      >;
      // Snooze Alarm for a Duration
      snooze: ServiceFunction<
        object,
        T,
        {
          // Snooze Duration in seconds @example 10 @constraints  number: min: 0, max: 1000
          snooze_time: number;
          // Will chime be snoozed?
          snooze_chime: boolean;
          // Will motion notifications be snoozed?
          snooze_motion: boolean;
          // Will home base be snoozed?
          snooze_homebase: boolean;
        }
      >;
    };
    switch: {
      // Turns a switch off.
      turnOff: ServiceFunction<object, T, object>;
      // Turns a switch on.
      turnOn: ServiceFunction<object, T, object>;
      // Toggles a switch on/off.
      toggle: ServiceFunction<object, T, object>;
    };
    hue: {
      // Activates a Hue scene with more control over the options.
      activateScene: ServiceFunction<
        object,
        T,
        {
          // Transition duration it takes to bring devices to the state defined in the scene. @constraints  number: min: 0, max: 3600, unit_of_measurement: seconds
          transition?: number;
          // Enable dynamic mode of the scene.
          dynamic?: boolean;
          // Speed of dynamic palette for this scene. @constraints  number: min: 0, max: 100
          speed?: number;
          // Set brightness for the scene. @constraints  number: min: 1, max: 255
          brightness?: number;
        }
      >;
      // Activates a Hue scene stored in the Hue hub.
      hueActivateScene: ServiceFunction<
        object,
        T,
        {
          // Name of Hue group/room from the Hue app. @example Living Room
          group_name?: string;
          // Name of Hue scene from the Hue app. @example Energize
          scene_name?: string;
          // Enable dynamic mode of the scene (V2 bridges and supported scenes only).
          dynamic?: boolean;
        }
      >;
    };
    number: {
      // Sets the value of a number.
      setValue: ServiceFunction<
        object,
        T,
        {
          // The target value to set. @example 42
          value: string;
        }
      >;
    };
    select: {
      // Selects the first option.
      selectFirst: ServiceFunction<object, T, object>;
      // Selects the last option.
      selectLast: ServiceFunction<object, T, object>;
      // Selects the next option.
      selectNext: ServiceFunction<
        object,
        T,
        {
          // If the option should cycle from the last to the first.
          cycle?: boolean;
        }
      >;
      // Selects an option.
      selectOption: ServiceFunction<
        object,
        T,
        {
          // Option to be selected. @example 'Item A'
          option: string;
        }
      >;
      // Selects the previous option.
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          // If the option should cycle from the first to the last.
          cycle?: boolean;
        }
      >;
    };
    calendar: {
      // Adds a new calendar event.
      createEvent: ServiceFunction<
        object,
        T,
        {
          // Defines the short summary or subject for the event. @example Department Party
          summary: string;
          // A more complete description of the event than the one provided by the summary. @example Meeting to provide technical review for 'Phoenix' design.
          description?: string;
          // The date and time the event should start. @example 2022-03-22 20:00:00
          start_date_time?: string;
          // The date and time the event should end. @example 2022-03-22 22:00:00
          end_date_time?: string;
          // The date the all-day event should start. @example 2022-03-22
          start_date?: string;
          // The date the all-day event should end (exclusive). @example 2022-03-23
          end_date?: string;
          // Days or weeks that you want to create the event in. @example {'days': 2} or {'weeks': 2}
          in?: object;
          // The location of the event. @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
      // Retrieves events on a calendar within a time range.
      getEvents: ServiceFunction<
        object,
        T,
        {
          // Returns active events after this time (exclusive). When not set, defaults to now. @example 2022-03-22 20:00:00
          start_date_time?: string;
          // Returns active events before this time (exclusive). Cannot be used with Duration. @example 2022-03-22 22:00:00
          end_date_time?: string;
          // Returns active events from Start time for the specified duration.
          duration?: {
            hours?: number;
            days?: number;
            minutes?: number;
            seconds?: number;
          };
        }
      >;
    };
    mediaPlayer: {
      // Turns on the power of the media player.
      turnOn: ServiceFunction<object, T, object>;
      // Turns off the power of the media player.
      turnOff: ServiceFunction<object, T, object>;
      // Toggles a media player on/off.
      toggle: ServiceFunction<object, T, object>;
      // Turns up the volume.
      volumeUp: ServiceFunction<object, T, object>;
      // Turns down the volume.
      volumeDown: ServiceFunction<object, T, object>;
      // Toggles play/pause.
      mediaPlayPause: ServiceFunction<object, T, object>;
      // Starts playing.
      mediaPlay: ServiceFunction<object, T, object>;
      // Pauses.
      mediaPause: ServiceFunction<object, T, object>;
      // Stops playing.
      mediaStop: ServiceFunction<object, T, object>;
      // Selects the next track.
      mediaNextTrack: ServiceFunction<object, T, object>;
      // Selects the previous track.
      mediaPreviousTrack: ServiceFunction<object, T, object>;
      // Removes all items from the playlist.
      clearPlaylist: ServiceFunction<object, T, object>;
      // Sets the volume level.
      volumeSet: ServiceFunction<
        object,
        T,
        {
          // The volume. 0 is inaudible, 1 is the maximum volume. @constraints  number: min: 0, max: 1, step: 0.01
          volume_level: number;
        }
      >;
      // Mutes or unmutes the media player.
      volumeMute: ServiceFunction<
        object,
        T,
        {
          // Defines whether or not it is muted.
          is_volume_muted: boolean;
        }
      >;
      // Allows you to go to a different part of the media that is currently playing.
      mediaSeek: ServiceFunction<
        object,
        T,
        {
          // Target position in the currently playing media. The format is platform dependent. @constraints  number: min: 0, max: 9223372036854776000, step: 0.01, mode: box
          seek_position: number;
        }
      >;
      // Groups media players together for synchronous playback. Only works on supported multiroom audio systems.
      join: ServiceFunction<
        object,
        T,
        {
          // The players which will be synced with the playback specified in 'Targets'. @example - media_player.multiroom_player2 - media_player.multiroom_player3
          group_members: string[];
        }
      >;
      // Sends the media player the command to change input source.
      selectSource: ServiceFunction<
        object,
        T,
        {
          // Name of the source to switch to. Platform dependent. @example video1
          source: string;
        }
      >;
      // Selects a specific sound mode.
      selectSoundMode: ServiceFunction<
        object,
        T,
        {
          // Name of the sound mode to switch to. @example Music
          sound_mode?: string;
        }
      >;
      // Starts playing specified media.
      playMedia: ServiceFunction<
        object,
        T,
        {
          // The ID of the content to play. Platform dependent. @example https://home-assistant.io/images/cast/splash.png
          media_content_id: string | number;
          // The type of the content to play, such as image, music, tv show, video, episode, channel, or playlist. @example music
          media_content_type: string;
          // If the content should be played now or be added to the queue.
          enqueue?: "play" | "next" | "add" | "replace";
          // If the media should be played as an announcement. @example true
          announce?: boolean;
        }
      >;
      // Browses the available media.
      browseMedia: ServiceFunction<
        object,
        T,
        {
          // The type of the content to browse, such as image, music, tv show, video, episode, channel, or playlist. @example music
          media_content_type?: string;
          // The ID of the content to browse. Integration dependent. @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
        }
      >;
      // Searches the available media.
      searchMedia: ServiceFunction<
        object,
        T,
        {
          // The term to search for. @example Beatles
          search_query: string;
          // The type of the content to browse, such as image, music, tv show, video, episode, channel, or playlist. @example music
          media_content_type?: string;
          // The ID of the content to browse. Integration dependent. @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
          // List of media classes to filter the search results by. @example album,artist
          media_filter_classes?: string;
        }
      >;
      // Enables or disables the shuffle mode.
      shuffleSet: ServiceFunction<
        object,
        T,
        {
          // Whether the media should be played in randomized order or not.
          shuffle: boolean;
        }
      >;
      // Removes the player from a group. Only works on platforms which support player groups.
      unjoin: ServiceFunction<object, T, object>;
      // Sets the repeat mode.
      repeatSet: ServiceFunction<
        object,
        T,
        {
          // Whether the media (one or all) should be played in a loop or not.
          repeat: "off" | "all" | "one";
        }
      >;
    };
    sonos: {
      // Takes a snapshot of a media player.
      snapshot: ServiceFunction<
        object,
        T,
        {
          // Name of entity that will be snapshot.
          entity_id?: string;
          // Whether the snapshot should include the group layout and the state of other speakers in the group.
          with_group?: boolean;
        }
      >;
      // Restores a snapshot of a media player.
      restore: ServiceFunction<
        object,
        T,
        {
          // Name of entity that will be restored.
          entity_id?: string;
          // Whether the group layout and the state of other speakers in the group should also be restored.
          with_group?: boolean;
        }
      >;
      // Sets a Sonos timer.
      setSleepTimer: ServiceFunction<
        object,
        T,
        {
          // Number of seconds to set the timer. @constraints  number: min: 0, max: 7200, unit_of_measurement: seconds
          sleep_time?: number;
        }
      >;
      // Clears a Sonos timer.
      clearSleepTimer: ServiceFunction<object, T, object>;
      // Updates an alarm with new time and volume settings.
      updateAlarm: ServiceFunction<
        object,
        T,
        {
          // The ID of the alarm to be updated. @constraints  number: min: 1, max: 1440, mode: box
          alarm_id: number;
          // The time for the alarm. @example 07:00
          time?: string;
          // The alarm volume level. @constraints  number: min: 0, max: 1, step: 0.01
          volume?: number;
          // Whether or not to enable the alarm.
          enabled?: boolean;
          // Whether the alarm also plays on grouped players.
          include_linked_zones?: boolean;
        }
      >;
      // Starts playing the queue from the first item.
      playQueue: ServiceFunction<
        object,
        T,
        {
          // Position of the song in the queue to start playing from. @constraints  number: min: 0, max: 10000, mode: box
          queue_position?: number;
        }
      >;
      // Removes an item from the queue.
      removeFromQueue: ServiceFunction<
        object,
        T,
        {
          // Position in the queue to remove. @constraints  number: min: 0, max: 10000, mode: box
          queue_position?: number;
        }
      >;
      // Returns the contents of the queue.
      getQueue: ServiceFunction<object, T, object>;
    };
    webostv: {
      // Sends a button press command.
      button: ServiceFunction<
        object,
        T,
        {
          // Name(s) of the webostv entities where to run the API method.
          entity_id: string;
          // Name of the button to press.  Known possible values are LEFT, RIGHT, DOWN, UP, HOME, MENU, BACK, ENTER, DASH, INFO, ASTERISK, CC, EXIT, MUTE, RED, GREEN, BLUE, YELLOW, VOLUMEUP, VOLUMEDOWN, CHANNELUP, CHANNELDOWN, PLAY, PAUSE, 0, 1, 2, 3, 4, 5, 6, 7, 8, 9. @example LEFT
          button: string;
        }
      >;
      // Sends a command.
      command: ServiceFunction<
        object,
        T,
        {
          // Name(s) of the webostv entities where to run the API method.
          entity_id: string;
          // Endpoint of the command. @example system.launcher/open
          command: string;
          // An optional payload to provide to the endpoint in the format of key value pair(s). @example target: https://www.google.com
          payload?: object;
        }
      >;
      // Sends the TV the command to change sound output.
      selectSoundOutput: ServiceFunction<
        object,
        T,
        {
          // Name(s) of the webostv entities to change sound output on.
          entity_id: string;
          // Name of the sound output to switch to. @example external_speaker
          sound_output: string;
        }
      >;
    };
    remote: {
      // Sends the turn off command.
      turnOff: ServiceFunction<object, T, object>;
      // Sends the turn on command.
      turnOn: ServiceFunction<
        object,
        T,
        {
          // Activity ID or activity name to be started. @example BedroomTV
          activity?: string;
        }
      >;
      // Sends the toggle command.
      toggle: ServiceFunction<object, T, object>;
      // Sends a command or a list of commands to a device.
      sendCommand: ServiceFunction<
        object,
        T,
        {
          // Device ID to send command to. @example 32756745
          device?: string;
          // A single command or a list of commands to send. @example Play
          command: object;
          // The number of times you want to repeat the commands. @constraints  number: min: 0, max: 255
          num_repeats?: number;
          // The time you want to wait in between repeated commands. @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds
          delay_secs?: number;
          // The time you want to have it held before the release is send. @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds
          hold_secs?: number;
        }
      >;
      // Learns a command or a list of commands from a device.
      learnCommand: ServiceFunction<
        object,
        T,
        {
          // Device ID to learn command from. @example television
          device?: string;
          // A single command or a list of commands to learn. @example Turn on
          command?: object;
          // The type of command to be learned.
          command_type?: "ir" | "rf";
          // If code must be stored as an alternative. This is useful for discrete codes. Discrete codes are used for toggles that only perform one function. For example, a code to only turn a device on. If it is on already, sending the code won't change the state.
          alternative?: boolean;
          // Timeout for the command to be learned. @constraints  number: min: 0, max: 60, step: 5, unit_of_measurement: seconds
          timeout?: number;
        }
      >;
      // Deletes a command or a list of commands from the database.
      deleteCommand: ServiceFunction<
        object,
        T,
        {
          // Device from which commands will be deleted. @example television
          device?: string;
          // The single command or the list of commands to be deleted. @example Mute
          command: object;
        }
      >;
    };
    weather: {
      // Retrieves the forecast from selected weather services.
      getForecasts: ServiceFunction<
        object,
        T,
        {
          // The scope of the weather forecast.
          type: "daily" | "hourly" | "twice_daily";
        }
      >;
    };
    climate: {
      // Turns climate device on.
      turnOn: ServiceFunction<object, T, object>;
      // Turns climate device off.
      turnOff: ServiceFunction<object, T, object>;
      // Toggles climate device, from on to off, or off to on.
      toggle: ServiceFunction<object, T, object>;
      // Sets HVAC operation mode.
      setHvacMode: ServiceFunction<
        object,
        T,
        {
          // HVAC operation mode.
          hvac_mode?:
            | "off"
            | "auto"
            | "cool"
            | "dry"
            | "fan_only"
            | "heat_cool"
            | "heat";
        }
      >;
      // Sets preset mode.
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          // Preset mode. @example away
          preset_mode: string;
        }
      >;
      // Sets the temperature setpoint.
      setTemperature: ServiceFunction<
        object,
        T,
        {
          // The temperature setpoint. @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          temperature?: number;
          // The max temperature setpoint. @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_high?: number;
          // The min temperature setpoint. @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_low?: number;
          // HVAC operation mode.
          hvac_mode?:
            | "off"
            | "auto"
            | "cool"
            | "dry"
            | "fan_only"
            | "heat_cool"
            | "heat";
        }
      >;
      // Sets target humidity.
      setHumidity: ServiceFunction<
        object,
        T,
        {
          // Target humidity. @constraints  number: min: 30, max: 99, unit_of_measurement: %
          humidity: number;
        }
      >;
      // Sets fan operation mode.
      setFanMode: ServiceFunction<
        object,
        T,
        {
          // Fan operation mode. @example low
          fan_mode: string;
        }
      >;
      // Sets swing operation mode.
      setSwingMode: ServiceFunction<
        object,
        T,
        {
          // Swing operation mode. @example on
          swing_mode: string;
        }
      >;
      // Sets horizontal swing operation mode.
      setSwingHorizontalMode: ServiceFunction<
        object,
        T,
        {
          // Horizontal swing operation mode. @example on
          swing_horizontal_mode: string;
        }
      >;
    };
    text: {
      // Sets the value.
      setValue: ServiceFunction<
        object,
        T,
        {
          // Enter your text. @example Hello world!
          value: string;
        }
      >;
    };
    valve: {
      // Opens a valve.
      openValve: ServiceFunction<object, T, object>;
      // Closes a valve.
      closeValve: ServiceFunction<object, T, object>;
      // Moves a valve to a specific position.
      setValvePosition: ServiceFunction<
        object,
        T,
        {
          // Target position. @constraints  number: min: 0, max: 100, unit_of_measurement: %
          position: number;
        }
      >;
      // Stops the valve movement.
      stopValve: ServiceFunction<object, T, object>;
      // Toggles a valve open/closed.
      toggle: ServiceFunction<object, T, object>;
    };
    lock: {
      // Unlocks a lock.
      unlock: ServiceFunction<
        object,
        T,
        {
          // Code used to unlock the lock. @example 1234
          code?: string;
        }
      >;
      // Locks a lock.
      lock: ServiceFunction<
        object,
        T,
        {
          // Code used to lock the lock. @example 1234
          code?: string;
        }
      >;
      // Opens a lock.
      open: ServiceFunction<
        object,
        T,
        {
          // Code used to open the lock. @example 1234
          code?: string;
        }
      >;
    };
    alarmControlPanel: {
      // Disarms the alarm.
      alarmDisarm: ServiceFunction<
        object,
        T,
        {
          // Code to disarm the alarm. @example 1234
          code?: string;
        }
      >;
      // Arms the alarm in the home mode.
      alarmArmHome: ServiceFunction<
        object,
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Arms the alarm in the away mode.
      alarmArmAway: ServiceFunction<
        object,
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Arms the alarm in the night mode.
      alarmArmNight: ServiceFunction<
        object,
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Arms the alarm in the vacation mode.
      alarmArmVacation: ServiceFunction<
        object,
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Arms the alarm while allowing to bypass a custom area.
      alarmArmCustomBypass: ServiceFunction<
        object,
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Triggers the alarm manually.
      alarmTrigger: ServiceFunction<
        object,
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
    };
    image: {
      // Takes a snapshot from an image.
      snapshot: ServiceFunction<
        object,
        T,
        {
          // Template of a filename. Variable available is `entity_id`. @example /tmp/image_snapshot.jpg
          filename: string;
        }
      >;
    };
    time: {
      // Sets the time.
      setValue: ServiceFunction<
        object,
        T,
        {
          // The time to set. @example 22:15
          time: string;
        }
      >;
    };
    vacuum: {
      // Starts or resumes the cleaning task.
      start: ServiceFunction<object, T, object>;
      // Pauses the cleaning task.
      pause: ServiceFunction<object, T, object>;
      // Tells the vacuum cleaner to return to its dock.
      returnToBase: ServiceFunction<object, T, object>;
      // Tells the vacuum cleaner to do a spot clean-up.
      cleanSpot: ServiceFunction<object, T, object>;
      // Locates the vacuum cleaner robot.
      locate: ServiceFunction<object, T, object>;
      // Stops the current cleaning task.
      stop: ServiceFunction<object, T, object>;
      // Sets the fan speed of the vacuum cleaner.
      setFanSpeed: ServiceFunction<
        object,
        T,
        {
          // Fan speed. The value depends on the integration. Some integrations have speed steps, like 'medium'. Some use a percentage, between 0 and 100. @example low
          fan_speed: string;
        }
      >;
      // Sends a command to the vacuum cleaner.
      sendCommand: ServiceFunction<
        object,
        T,
        {
          // Command to execute. The commands are integration-specific. @example set_dnd_timer
          command: string;
          // Parameters for the command. The parameters are integration-specific. @example { 'key': 'value' }
          params?: object;
        }
      >;
    };
    roborock: {
      // Retrieves the map and room information of your device.
      getMaps: ServiceFunction<object, T, object>;
      // Retrieves the current position of the vacuum.
      getVacuumCurrentPosition: ServiceFunction<object, T, object>;
      // Sends the vacuum to a specific position.
      setVacuumGotoPosition: ServiceFunction<
        object,
        T,
        {
          // Coordinates are relative to the dock. x=25500,y=25500 is the dock position. @example 27500
          x: string;
          // Coordinates are relative to the dock. x=25500,y=25500 is the dock position. @example 32000
          y: string;
        }
      >;
    };
    googleAssistantSdk: {
      // Sends a command as a text query to Google Assistant.
      sendTextCommand: ServiceFunction<
        object,
        T,
        {
          // Command(s) to send to Google Assistant. @example turn off kitchen TV
          command?: string;
          // Name(s) of media player entities to play response on. @example media_player.living_room_speaker
          media_player?: string;
        }
      >;
    };
    google: {
      // Adds a new calendar event.
      addEvent: ServiceFunction<
        object,
        T,
        {
          // The id of the calendar you want. @example Your email
          calendar_id: string;
          // Acts as the title of the event. @example Bowling
          summary: string;
          // The description of the event. Optional. @example Birthday bowling
          description?: string;
          // The date and time the event should start. @example 2019-03-22 20:00:00
          start_date_time?: string;
          // The date and time the event should end. @example 2019-03-22 22:00:00
          end_date_time?: string;
          // The date the whole day event should start. @example 2019-03-10
          start_date?: string;
          // The date the whole day event should end. @example 2019-03-11
          end_date?: string;
          // Days or weeks that you want to create the event in. @example 'days': 2 or 'weeks': 2
          in?: object;
        }
      >;
      // Adds a new calendar event.
      createEvent: ServiceFunction<
        object,
        T,
        {
          // Acts as the title of the event. @example Bowling
          summary: string;
          // The description of the event. Optional. @example Birthday bowling
          description?: string;
          // The date and time the event should start. @example 2022-03-22 20:00:00
          start_date_time?: string;
          // The date and time the event should end. @example 2022-03-22 22:00:00
          end_date_time?: string;
          // The date the whole day event should start. @example 2022-03-10
          start_date?: string;
          // The date the whole day event should end. @example 2022-03-11
          end_date?: string;
          // Days or weeks that you want to create the event in. @example 'days': 2 or 'weeks': 2
          in?: object;
          // The location of the event. Optional. @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
    };
    fullyKiosk: {
      // Loads a URL on Fully Kiosk Browser.
      loadUrl: ServiceFunction<
        object,
        T,
        {
          // URL to load. @example https://home-assistant.io
          url: string;
        }
      >;
      // Starts an application on the device running Fully Kiosk Browser.
      startApplication: ServiceFunction<
        object,
        T,
        {
          // Package name of the application to start. @example de.ozerov.fully
          application: string;
        }
      >;
      // Sets a configuration parameter on Fully Kiosk Browser.
      setConfig: ServiceFunction<
        object,
        T,
        {
          // Configuration parameter to set. @example motionSensitivity
          key: string;
          // Value for the configuration parameter. @example 90
          value: string;
        }
      >;
    };
    bambuLab: {
      // Send an arbitrary command to the 3D printer
      sendCommand: ServiceFunction<
        object,
        T,
        {
          // The command to send to the printer @example M104 S200
          command: string;
        }
      >;
      // Print sliced 3MF file stored on the SD card
      printProjectFile: ServiceFunction<
        object,
        T,
        {
          // Filename on SD card @example filename.3mf
          filepath: string;
          // Plate number to print @constraints  number: mode: box, min: 1, max: 100
          plate: number;
          // Record timelapse of the print
          timelapse: boolean;
          // Perform bed leveling before print
          bed_leveling: boolean;
          // Perform flow calibration before print
          flow_cali: boolean;
          // Perform vibration calibration (aka XY Mech Sweep) before print
          vibration_cali: boolean;
          // Perform first layer inspection during print
          layer_inspect: boolean;
          // Use AMS for print. Uses external spool otherwise
          use_ams: boolean;
          // https://community.home-assistant.io/t/bambu-lab-x1-x1c-mqtt/489510/738 @example 2,-1,0
          ams_mapping: string;
        }
      >;
      // Skip objects currently being printed
      skipObjects: ServiceFunction<
        object,
        T,
        {
          // Object IDs are available from printable objects entity attributes @example 409,1463
          objects: string;
        }
      >;
      // Move the printhead or bed
      moveAxis: ServiceFunction<
        object,
        T,
        {
          // The axis to move. X1 and P1 devices, X and Y move the printhead, Z moves the bed. A1, Z moves the gantry, Y the bed, X the printhead. @example X
          axis: "X" | "Y" | "Z" | "Home";
          // The distance (in mm) to move the axis A negative distance moves Z up, X left, Y forward. @example 10 @constraints  number: min: -100, max: 100, step: 1
          distance?: number;
        }
      >;
      // Unload the filament currently loaded into the extruder
      unloadFilament: ServiceFunction<object, T, object>;
      // Load a new filament into the extruder passed an AMS tray or an External spool entity
      loadFilament: ServiceFunction<
        object,
        T,
        {
          // Target nozzle temperature once the filament is loaded. By default uses the midpoint between min and max temperature of the chosen filament. @example 220 @constraints  number: min: 0, max: 250, step: 1
          temperature?: number;
        }
      >;
      // Perform an extrusion or extraction of the loaded filament
      extrudeRetract: ServiceFunction<
        object,
        T,
        {
          // The type of extrude action to perform @example Extrude
          type: "Extrude" | "Retract";
          // Perform extrusion or retraction if nozzle temperature is below 170ºC.
          force?: boolean;
        }
      >;
      // Sets filament details on an AMS tray or an External spool entity
      setFilament: ServiceFunction<
        object,
        T,
        {
          // Bambu's filament ID. E.g. GFL96 is Generic PLA Silk @example GFL96
          tray_info_idx: string;
          // RGBA value for the color. E.g. FF0000FF is opaque red. @example FF0000FF
          tray_color: string;
          // Type of filament. E.g. 'PLA' or 'PETG' @example PLA
          tray_type: string;
          // The minimum temperature that it is recommended to print this filament at. @example 220 @constraints  number: min: 160, max: 300, step: 1
          nozzle_temp_min: number;
          // The maximum temperature that it is recommended to print this filament at. @example 220 @constraints  number: min: 160, max: 300, step: 1
          nozzle_temp_max: number;
        }
      >;
      // Gets a json string with details about all known filaments
      getFilamentData: ServiceFunction<object, T, object>;
    };
    assistSatellite: {
      // Lets a satellite announce a message.
      announce: ServiceFunction<
        object,
        T,
        {
          // The message to announce. @example Time to wake up!
          message?: string;
          // The media ID to announce instead of using text-to-speech.
          media_id?: string;
          // Play a sound before the announcement.
          preannounce?: boolean;
          // Custom media ID to play before the announcement.
          preannounce_media_id?: string;
        }
      >;
      // Starts a conversation from a satellite.
      startConversation: ServiceFunction<
        object,
        T,
        {
          // The message to start with. @example You left the lights on in the living room. Turn them off?
          start_message?: string;
          // The media ID to start with instead of using text-to-speech.
          start_media_id?: string;
          // Provide background information to the AI about the request.
          extra_system_prompt?: string;
          // Play a sound before the start message or media.
          preannounce?: boolean;
          // Custom media ID to play before the start message or media.
          preannounce_media_id?: string;
        }
      >;
    };
    automation: {
      // Triggers the actions of an automation.
      trigger: ServiceFunction<
        object,
        T,
        {
          // Defines whether or not the conditions will be skipped.
          skip_condition?: boolean;
        }
      >;
      // Toggles (enable / disable) an automation.
      toggle: ServiceFunction<object, T, object>;
      // Enables an automation.
      turnOn: ServiceFunction<object, T, object>;
      // Disables an automation.
      turnOff: ServiceFunction<
        object,
        T,
        {
          // Stops currently running actions.
          stop_actions?: boolean;
        }
      >;
      // Reloads the automation configuration.
      reload: ServiceFunction<object, T, object>;
    };
    zha: {
      // Allows nodes to join the Zigbee network.
      permit: ServiceFunction<
        object,
        T,
        {
          // Time to permit joins. @constraints  number: min: 0, max: 254, unit_of_measurement: seconds
          duration?: number;
          // IEEE address of the node permitting new joins. @example 00:0d:6f:00:05:7d:2d:34
          ieee?: string;
          // IEEE address of the joining device (must be combined with the 'Install code' field). @example 00:0a:bf:00:01:10:23:35
          source_ieee?: string;
          // Install code of the joining device (must be combined with the 'Source IEEE' field). @example 1234-5678-1234-5678-AABB-CCDD-AABB-CCDD-EEFF
          install_code?: string;
          // Provides both the IEEE address and the install code of the joining device (different between vendors). @example Z:000D6FFFFED4163B$I:52797BF4A5084DAA8E1712B61741CA024051
          qr_code?: string;
        }
      >;
      // Removes a node from the Zigbee network.
      remove: ServiceFunction<
        object,
        T,
        {
          // IEEE address of the node to remove. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
        }
      >;
      // Sets an attribute value for the specified cluster on the specified entity.
      setZigbeeClusterAttribute: ServiceFunction<
        object,
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // Endpoint ID for the cluster. @constraints  number: min: 1, max: 65535, mode: box
          endpoint_id: number;
          // ZCL cluster to retrieve attributes for. @constraints  number: min: 1, max: 65535
          cluster_id: number;
          // Type of the cluster.
          cluster_type?: "in" | "out";
          // ID of the attribute to set. @constraints  number: min: 1, max: 65535
          attribute: number;
          // Value to write to the attribute. @example 1
          value: string;
          // Manufacturer code. Use a value of '-1' to force no code to be set. @example 252
          manufacturer?: string;
        }
      >;
      // Issues a command on the specified cluster on the specified entity.
      issueZigbeeClusterCommand: ServiceFunction<
        object,
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // Endpoint ID for the cluster. @constraints  number: min: 1, max: 65535
          endpoint_id: number;
          // ZCL cluster to retrieve attributes for. @constraints  number: min: 1, max: 65535
          cluster_id: number;
          // Type of the cluster.
          cluster_type?: "in" | "out";
          // ID of the command to execute. @constraints  number: min: 1, max: 65535
          command: number;
          // Type of the command to execute.
          command_type: "client" | "server";
          // Arguments to pass to the command. @example [arg1, arg2, argN]
          args?: object;
          // Parameters to pass to the command.
          params?: object;
          // Manufacturer code. Use a value of '-1' to force no code to be set. @example 252
          manufacturer?: string;
        }
      >;
      // Issues a command on the specified cluster on the specified group.
      issueZigbeeGroupCommand: ServiceFunction<
        object,
        T,
        {
          // Hexadecimal address of the group. @example 546
          group: string;
          // ZCL cluster to send command to. @constraints  number: min: 1, max: 65535
          cluster_id: number;
          // Type of the cluster.
          cluster_type?: "in" | "out";
          // ID of the command to execute. @constraints  number: min: 1, max: 65535
          command: number;
          // Arguments to pass to the command. @example [arg1, arg2, argN]
          args?: object;
          // Manufacturer code. Use a value of '-1' to force no code to be set. @example 252
          manufacturer?: string;
        }
      >;
      // This action uses the WD capabilities to emit a quick audible/visible pulse called a 'squawk'. The squawk command has no effect if the WD is currently active (warning in progress).
      warningDeviceSquawk: ServiceFunction<
        object,
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // The Squawk Mode field is used as a 4-bit enumeration, and can have one of the values shown in Table 8-24 of the ZCL spec - Squawk Mode Field. The exact operation of each mode (how the WD “squawks”) is implementation specific. @constraints  number: min: 0, max: 1, mode: box
          mode?: number;
          // The strobe field is used as a Boolean, and determines if the visual indication is also required in addition to the audible squawk, as shown in Table 8-25 of the ZCL spec - Strobe Bit. @constraints  number: min: 0, max: 1, mode: box
          strobe?: number;
          // The squawk level field is used as a 2-bit enumeration, and determines the intensity of audible squawk sound as shown in Table 8-26 of the ZCL spec - Squawk Level Field Values. @constraints  number: min: 0, max: 3, mode: box
          level?: number;
        }
      >;
      // This action starts the operation of the warning device. The warning device alerts the surrounding area by audible (siren) and visual (strobe) signals.
      warningDeviceWarn: ServiceFunction<
        object,
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // The Warning Mode field is used as a 4-bit enumeration, can have one of the values 0-6 defined below in table 8-20 of the ZCL spec. The exact behavior of the warning device in each mode is according to the relevant security standards. @constraints  number: min: 0, max: 6, mode: box
          mode?: number;
          // The Strobe field is used as a 2-bit enumeration, and determines if the visual indication is required in addition to the audible siren, as indicated in Table 8-21 of the ZCL spec. '0' means no strobe, '1' means strobe. If the strobe field is “1” and the Warning Mode is “0” (“Stop”), then only the strobe is activated. @constraints  number: min: 0, max: 1, mode: box
          strobe?: number;
          // The Siren Level field is used as a 2-bit enumeration, and indicates the intensity of audible squawk sound as shown in Table 8-22 of the ZCL spec. @constraints  number: min: 0, max: 3, mode: box
          level?: number;
          // Requested duration of warning, in seconds (16 bit). If both Strobe and Warning Mode are '0' this field is ignored. @constraints  number: min: 0, max: 65535, unit_of_measurement: seconds
          duration?: number;
          // Indicates the length of the flash cycle. This allows you to vary the flash duration for different alarm types (e.g., fire, police, burglar). The valid range is 0-100 in increments of 10. All other values must be rounded to the nearest valid value. Strobe calculates a duty cycle over a duration of one second. The ON state must precede the OFF state. For example, if the Strobe Duty Cycle field specifies “40,”, then the strobe flashes ON for 4/10ths of a second and then turns OFF for 6/10ths of a second. @constraints  number: min: 0, max: 100, step: 10
          duty_cycle?: number;
          // Indicates the intensity of the strobe as shown in Table 8-23 of the ZCL spec. This attribute is designed to vary the output of the strobe (i.e., brightness) and not its frequency, which is detailed in section 8.4.2.3.1.6 of the ZCL spec. @constraints  number: min: 0, max: 3, mode: box
          intensity?: number;
        }
      >;
      // Sets a user code on a lock.
      setLockUserCode: ServiceFunction<
        object,
        T,
        {
          // Code slot to set the code in. @example 1
          code_slot: string;
          // Code to set. @example 1234
          user_code: string;
        }
      >;
      // Enables a user code on a lock.
      enableLockUserCode: ServiceFunction<
        object,
        T,
        {
          // Code slot to enable. @example 1
          code_slot: string;
        }
      >;
      // Disables a user code on a lock.
      disableLockUserCode: ServiceFunction<
        object,
        T,
        {
          // Code slot to disable. @example 1
          code_slot: string;
        }
      >;
      // Clears a user code from a lock.
      clearLockUserCode: ServiceFunction<
        object,
        T,
        {
          // Code slot to clear code from. @example 1
          code_slot: string;
        }
      >;
    };
    siren: {
      // Turns the siren on.
      turnOn: ServiceFunction<
        object,
        T,
        {
          // The tone to emit. When `available_tones` property is a map, either the key or the value can be used. Must be supported by the integration. @example fire
          tone?: string;
          // The volume. 0 is inaudible, 1 is the maximum volume. Must be supported by the integration. @example 0.5 @constraints  number: min: 0, max: 1, step: 0.05
          volume_level?: number;
          // Number of seconds the sound is played. Must be supported by the integration. @example 15
          duration?: string;
        }
      >;
      // Turns the siren off.
      turnOff: ServiceFunction<object, T, object>;
      // Toggles the siren on/off.
      toggle: ServiceFunction<object, T, object>;
    };
    waterHeater: {
      // Turns water heater on.
      turnOn: ServiceFunction<object, T, object>;
      // Turns water heater off.
      turnOff: ServiceFunction<object, T, object>;
      // Turns away mode on/off.
      setAwayMode: ServiceFunction<
        object,
        T,
        {
          // New value of away mode.
          away_mode: boolean;
        }
      >;
      // Sets the target temperature.
      setTemperature: ServiceFunction<
        object,
        T,
        {
          // New target temperature for the water heater. @constraints  number: min: 0, max: 100, step: 0.5, unit_of_measurement: °
          temperature: number;
          // New value of the operation mode. For a list of possible modes, refer to the integration documentation. @example eco
          operation_mode?: string;
        }
      >;
      // Sets the operation mode.
      setOperationMode: ServiceFunction<
        object,
        T,
        {
          // New value of the operation mode. For a list of possible modes, refer to the integration documentation. @example eco
          operation_mode: string;
        }
      >;
    };
  }
  export interface CustomEntityNameContainer {
    names:
      | "update.home_assistant_supervisor_update"
      | "update.home_assistant_core_update"
      | "update.ssh_web_terminal_update"
      | "update.cloudflared_update"
      | "update.file_editor_update"
      | "update.home_assistant_google_drive_backup_update"
      | "update.mosquitto_broker_update"
      | "update.samba_share_update"
      | "update.studio_code_server_update"
      | "update.eufy_security_ws_update"
      | "update.music_assistant_server_update"
      | "update.esphome_device_builder_update"
      | "update.home_assistant_operating_system_update"
      | "group.household_people"
      | "group.downstairs_lights"
      | "group.office_lights"
      | "group.bedroom_lights"
      | "group.garden_lights"
      | "light.bedroom_group"
      | "light.office_group"
      | "light.garden_group"
      | "light.kitchen_table_group"
      | "light.living_room_group"
      | "light.kitchen_spots"
      | "light.kitchen_group"
      | "light.living_room_spots"
      | "light.attic_group"
      | "conversation.home_assistant"
      | "binary_sensor.humidity_rising"
      | "sensor.count_lights_on"
      | "sensor.living_room_temperature"
      | "sensor.living_room_humidity"
      | "sensor.outside_temperature"
      | "sensor.outside_humidity"
      | "sensor.rain_incoming"
      | "sensor.lg_channel"
      | "sensor.time"
      | "sensor.date"
      | "sensor.date_time"
      | "sensor.date_time_utc"
      | "sensor.date_time_iso"
      | "sensor.time_date"
      | "sensor.time_utc"
      | "button.synchronize_devices"
      | "event.backup_automatic_backup"
      | "sensor.backup_backup_manager_state"
      | "sensor.backup_next_scheduled_automatic_backup"
      | "sensor.backup_last_successful_automatic_backup"
      | "sensor.backup_last_attempted_automatic_backup"
      | "binary_sensor.remote_ui"
      | "stt.home_assistant_cloud"
      | "tts.home_assistant_cloud"
      | "fan.mechanical_ventilation"
      | "scene.ventilation_off"
      | "scene.ventilation_setting_1"
      | "scene.ventilation_setting_2"
      | "scene.ventilation_speed_3"
      | "cover.garage_door_cover"
      | "input_number.garage_door_current_orientation"
      | "input_number.garage_door_last_orientation"
      | "zone.work_claire"
      | "zone.parents_rens"
      | "zone.parents_claire"
      | "zone.frontliners"
      | "input_boolean.minimalist_welcome_toggle"
      | "input_select.wled_live_override"
      | "zone.home"
      | "person.rens"
      | "person.claire"
      | "tag.217c05de_0873_415d_988f_9716201958eb"
      | "script.set_home_to_away_mode"
      | "script.cast_camera_to_driveway_monitor"
      | "script.turn_off_all_lights"
      | "script.ventilation_on_full_speed"
      | "script.turn_ventilation_off"
      | "script.good_morning"
      | "script.toggle_ventilation"
      | "script.timed_bedroom_fan"
      | "script.show_ha_settings_on_tablet"
      | "script.start_eufy_voordeur_stream"
      | "sun.sun"
      | "sensor.sun_next_dawn"
      | "sensor.sun_next_dusk"
      | "sensor.sun_next_midnight"
      | "sensor.sun_next_noon"
      | "sensor.sun_next_rising"
      | "sensor.sun_next_setting"
      | "binary_sensor.iphone_focus"
      | "device_tracker.iphone"
      | "sensor.iphone_sim_1"
      | "sensor.iphone_battery_state"
      | "sensor.iphone_battery_level"
      | "sensor.iphone_storage"
      | "sensor.iphone_connection_type"
      | "sensor.iphone_bssid"
      | "sensor.iphone_last_update_trigger"
      | "sensor.iphone_ssid"
      | "sensor.iphone_sim_2"
      | "sensor.iphone_geocoded_location"
      | "sensor.iphone_activity"
      | "sensor.iphone_steps"
      | "sensor.iphone_distance"
      | "sensor.iphone_floors_descended"
      | "sensor.iphone_average_active_pace"
      | "sensor.iphone_floors_ascended"
      | "sensor.renss_iphone_app_version"
      | "sensor.renss_iphone_watch_battery"
      | "sensor.renss_iphone_location_permission"
      | "sensor.renss_iphone_watch_battery_state"
      | "sensor.renss_iphone_audio_output"
      | "device_tracker.galaxy_watch5_yr0h"
      | "sensor.galaxy_watch5_yr0h_battery_level"
      | "sensor.galaxy_watch5_yr0h_battery_state"
      | "sensor.galaxy_watch5_yr0h_charger_type"
      | "device_tracker.xiaomi_pad_5"
      | "sensor.xiaomi_pad_5_battery_level"
      | "sensor.xiaomi_pad_5_battery_state"
      | "sensor.xiaomi_pad_5_charger_type"
      | "device_tracker.volvo"
      | "device_tracker.pixel_5_2"
      | "sensor.pixel_5_battery_level"
      | "sensor.pixel_5_battery_state"
      | "sensor.pixel_5_charger_type"
      | "device_tracker.pixel_9"
      | "sensor.pixel_9_battery_level"
      | "sensor.pixel_9_battery_state"
      | "sensor.pixel_9_charger_type"
      | "device_tracker.oneplus_7t_pro"
      | "device_tracker.claire_s_telefoon"
      | "device_tracker.rens_iphone"
      | "binary_sensor.rpi_power_status"
      | "sensor.dcp_l2530dw_status"
      | "sensor.dcp_l2530dw_page_counter"
      | "sensor.dcp_l2530dw_duplex_unit_page_counter"
      | "sensor.dcp_l2530dw_drum_remaining_lifetime"
      | "sensor.dcp_l2530dw_drum_remaining_pages"
      | "sensor.dcp_l2530dw_drum_page_counter"
      | "sensor.dcp_l2530dw_black_toner_remaining"
      | "sensor.cpu_temperature"
      | "sensor.neerslag_buienalarm_regen_data"
      | "sensor.neerslag_buienradar_regen_data"
      | "switch.card_mod_pre_release"
      | "switch.mini_graph_card_pre_release"
      | "update.browser_mod_update"
      | "update.swiss_army_knife_custom_card_update"
      | "update.card_mod_update"
      | "update.plex_recently_added_sensor_update"
      | "update.mini_graph_card_update"
      | "update.hyperhdr_update"
      | "update.atomic_calendar_revive_update"
      | "update.layout_card_update"
      | "update.swipe_card_update"
      | "update.mushroom_themes_update"
      | "update.lovelace_clock_card_update"
      | "update.kiosk_mode_update_2"
      | "update.mini_media_player_update"
      | "update.webrtc_camera_update"
      | "update.simple_weather_card_update"
      | "update.button_card_update"
      | "update.ui_lovelace_minimalist_update"
      | "update.my_cards_bundle_update"
      | "update.digital_clock_update"
      | "update.kiosk_mode_update"
      | "update.neerslag_card_update"
      | "update.hass_hue_icons_update"
      | "update.fontawesome_update"
      | "update.light_entity_card_update"
      | "update.bambu_lab_update"
      | "update.animated_weather_card_update"
      | "update.hacs_update"
      | "update.zonneplan_update"
      | "update.eufy_security_update"
      | "update.auto_entities_update"
      | "update.mushroom_update"
      | "binary_sensor.hue_motion_sensor_hal_motion"
      | "binary_sensor.tv_entertainment_configuration"
      | "binary_sensor.entertainmentruimte_1_entertainment_configuration"
      | "event.niko_eetkamer_button_2"
      | "event.niko_garagedeur_button_4"
      | "event.kleedkamer_dimmer_button_3"
      | "event.kantoor_dimmer_button_2"
      | "event.zolder_dimmer_button_2"
      | "event.slaapkamer_dimmer_button_3"
      | "event.niko_garagedeur_button_3"
      | "event.kleedkamer_dimmer_button_1"
      | "event.kantoor_dimmer_button_4"
      | "event.niko_garagedeur_button_1"
      | "event.niko_eetkamer_button_4"
      | "event.zolder_dimmer_button_4"
      | "event.kleedkamer_dimmer_button_2"
      | "event.kantoor_dimmer_button_3"
      | "event.slaapkamer_dimmer_button_4"
      | "event.zolder_dimmer_button_3"
      | "event.kleedkamer_dimmer_button_4"
      | "event.niko_eetkamer_button_3"
      | "event.slaapkamer_dimmer_button_1"
      | "event.slaapkamer_dimmer_button_2"
      | "event.kantoor_dimmer_button_1"
      | "event.niko_garagedeur_button_2"
      | "event.zolder_dimmer_button_1"
      | "event.niko_eetkamer_button_1"
      | "light.hue_go_1"
      | "light.hue_filament_bulb_3"
      | "light.hue_ambiance_spot_6"
      | "light.hue_ambiance_spot_1"
      | "light.hue_ambiance_spot_4"
      | "light.hue_milliskin_spot_2"
      | "light.christmas_tree"
      | "light.hue_ambiance_spot_2"
      | "light.vloerlamp"
      | "light.lightstrip_bureau"
      | "light.hue_ambiance_spot_5"
      | "light.kleedkamer"
      | "light.hue_ambiance_spot_3"
      | "light.slaapkamer_plafondlamp"
      | "light.hue_sana"
      | "light.buitenverlichting_tuin"
      | "light.hue_filament_bulb_2"
      | "light.hue_milliskin_spot_3"
      | "light.kantoor"
      | "light.garagedeur"
      | "light.hue_play_1"
      | "light.hue_filament_bulb_1"
      | "light.hue_milliskin_spot_1"
      | "light.nachtkastje_rens"
      | "light.hue_impress_outdoor_wall_1"
      | "light.hue_color_lamp_1"
      | "light.hue_color_lamp_1_2"
      | "light.hue_play_2"
      | "light.tuin"
      | "scene.kleedkamer_savanne_zonsondergang"
      | "scene.slaapkamer_shine"
      | "scene.benedenverdieping_tropische_schemering"
      | "scene.keuken_nachtlampje"
      | "scene.kantoor_savanne_zonsondergang"
      | "scene.bovenverdieping_savanne_zonsondergang"
      | "scene.benedenverdieping_nachtlampje"
      | "scene.spotjes_keuken_concentrate"
      | "scene.kantoor_concentreren"
      | "scene.slaapkamer_sleepy"
      | "scene.spotjes_tropische_schemering"
      | "scene.keuken_gedimd"
      | "scene.spotjes_lentebloesem"
      | "scene.woonkamer_romantisch"
      | "scene.slaapkamer_nachtlampje"
      | "scene.bovenverdieping_lentebloesem"
      | "scene.kleedkamer_concentreren"
      | "scene.hal_concentreren"
      | "scene.slaapkamer_warme_omhelzing"
      | "scene.benedenverdieping_lentebloesem"
      | "scene.kleedkamer_helder"
      | "scene.spotjes_helder"
      | "scene.kantoor_gedimd"
      | "scene.zolder_nightlight"
      | "scene.kleedkamer_tropische_schemering"
      | "scene.kantoor_ontspannen"
      | "scene.spotjes_arctische_dageraad"
      | "scene.hal_gedimd"
      | "scene.spotjes_lezen"
      | "scene.slaapkamer_amber_bloom"
      | "scene.kantoor_work_daytime"
      | "scene.hal_hal_scene"
      | "scene.woonkamer_nightlight"
      | "scene.slaapkamer_gedimd"
      | "scene.kleedkamer_energie"
      | "scene.hal_hal_gedimd"
      | "scene.slaapkamer_nighttime"
      | "scene.kleedkamer_lezen"
      | "scene.benedenverdieping_helder"
      | "scene.bovenverdieping_concentreren"
      | "scene.zolder_lively"
      | "scene.kantoor_nachtlampje"
      | "scene.hal_arctische_dageraad"
      | "scene.zolder_lezen"
      | "scene.zolder_nevel"
      | "scene.benedenverdieping_arctische_dageraad"
      | "scene.benedenverdieping_savanne_zonsondergang"
      | "scene.kleedkamer_gedimd"
      | "scene.kantoor_sunday_morning"
      | "scene.kantoor_work_nighttime"
      | "scene.bovenverdieping_gedimd"
      | "scene.spotjes_keuken_energize"
      | "scene.slaapkamer_arise"
      | "scene.kantoor_lezen"
      | "scene.zolder_tokio"
      | "scene.woonkamer_osaka"
      | "scene.slaapkamer_pensive"
      | "scene.hal_ontspannen"
      | "scene.bovenverdieping_ontspannen"
      | "scene.woonkamer_avond"
      | "scene.bovenverdieping_helder"
      | "scene.kantoor_work"
      | "scene.spotjes_ontspannen"
      | "scene.woonkamer_concentrate"
      | "scene.woonkamer_movie_scene"
      | "scene.woonkamer_night"
      | "scene.hal_nachtlampje"
      | "scene.spotjes_keuken_read"
      | "scene.tuin_helder"
      | "scene.spotjes_nachtlampje"
      | "scene.tuin_gedimd"
      | "scene.kantoor_energie"
      | "scene.kleedkamer_lentebloesem"
      | "scene.benedenverdieping_concentreren"
      | "scene.benedenverdieping_energie"
      | "scene.tuin_nachtlampje"
      | "scene.spotjes_savanne_zonsondergang"
      | "scene.slaapkamer_blossom"
      | "scene.slaapkamer_read"
      | "scene.slaapkamer_savanne_zonsondergang"
      | "scene.woonkamer_de_rens_scene"
      | "scene.slaapkamer_avond"
      | "scene.spotjes_keuken_rest"
      | "scene.zolder_energie"
      | "scene.woonkamer_soho"
      | "scene.slaapkamer_tropische_schemering"
      | "scene.bovenverdieping_lezen"
      | "scene.spotjes_energie"
      | "scene.slaapkamer_dreamy_dusk"
      | "scene.kantoor_precious"
      | "scene.woonkamer_relax"
      | "scene.bovenverdieping_nachtlampje"
      | "scene.woonkamer_oranje"
      | "scene.bovenverdieping_energie"
      | "scene.benedenverdieping_ontspannen"
      | "scene.hal_energie"
      | "scene.hal_lentebloesem"
      | "scene.kleedkamer_nachtlampje"
      | "scene.woonkamer_rest"
      | "scene.bovenverdieping_tropische_schemering"
      | "scene.spotjes_keuken_nightlight"
      | "scene.hal_lezen"
      | "scene.kantoor_tropische_schemering"
      | "scene.kantoor_helder"
      | "scene.slaapkamer_ondergaande_zon"
      | "scene.kleedkamer_arctische_dageraad"
      | "scene.hal_helder"
      | "scene.spotjes_gedimd"
      | "scene.hal_tropische_schemering"
      | "scene.kleedkamer_ontspannen"
      | "scene.woonkamer_read"
      | "scene.slaapkamer_baby_s_breath"
      | "scene.benedenverdieping_lezen"
      | "scene.zolder_concentreren"
      | "scene.bovenverdieping_arctische_dageraad"
      | "scene.spotjes_concentreren"
      | "scene.keuken_helder"
      | "scene.slaapkamer_storybook"
      | "scene.slaapkamer_ontspannen"
      | "scene.slaapkamer_unwind"
      | "scene.kantoor_arctische_dageraad"
      | "scene.woonkamer_energize"
      | "scene.kantoor_lentebloesem"
      | "scene.zolder_ontspannen"
      | "scene.benedenverdieping_gedimd"
      | "scene.hal_savanne_zonsondergang"
      | "scene.spotjes_keuken_relax"
      | "scene.slaapkamer_concentreren"
      | "scene.spotjes_keuken_natural_light"
      | "scene.slaapkamer_golden_hours"
      | "scene.woonkamer_natural_light"
      | "scene.slaapkamer_nature_s_colors"
      | "sensor.hue_motion_sensor_hal_temperature"
      | "sensor.hue_motion_sensor_hal_light_level"
      | "sensor.kleedkamer_dimmer_battery_level"
      | "sensor.slaapkamer_dimmer_battery_level"
      | "sensor.hue_motion_sensor_hal_battery"
      | "sensor.kantoor_dimmer_battery_level"
      | "sensor.hue_dimmer_switch_1_battery_level"
      | "switch.hue_motion_sensor_hal_motion"
      | "switch.hue_motion_sensor_hal_illuminance"
      | "switch.automation_zolder_dimmer"
      | "switch.automation_hal_avond"
      | "switch.automation_coming_home"
      | "switch.automation_kantoor_dimmer"
      | "switch.automation_licht_aan"
      | "switch.automation_state_after_streaming"
      | "switch.automation_kleedkamer_dimmer"
      | "switch.automation_mimic_presence"
      | "switch.automation_slaapkamer_dimmer"
      | "switch.automation_hue_motion_sensor_hal"
      | "switch.automation_leaving_home"
      | "switch.automation_tuin_aan"
      | "sensor.sonarr_upcoming"
      | "conversation.chatgpt"
      | "binary_sensor.morning"
      | "binary_sensor.evening"
      | "binary_sensor.night"
      | "binary_sensor.afternoon"
      | "button.wled_restart_2"
      | "light.wled_2"
      | "number.wled_speed_2"
      | "number.wled_intensity_2"
      | "select.wled_live_override_2"
      | "select.wled_playlist_2"
      | "select.wled_preset_2"
      | "select.wled_color_palette_2"
      | "sensor.wled_estimated_current_2"
      | "sensor.wled_led_count_2"
      | "sensor.wled_max_current_2"
      | "sensor.wled_ip"
      | "switch.wled_nightlight_2"
      | "switch.wled_sync_send_2"
      | "switch.wled_sync_receive_2"
      | "switch.wled_reverse_2"
      | "update.wled_firmware_2"
      | "binary_sensor.radarr_health"
      | "calendar.radarr"
      | "sensor.radarr_disk_space_movies"
      | "media_player.nest_wifi_kantoor"
      | "media_player.tv"
      | "media_player.nest_hub"
      | "media_player.google_home_mini"
      | "media_player.lg_c8"
      | "media_player.chromecast"
      | "remote.chromecast"
      | "media_player.nest_wifi_kantoor_ma"
      | "media_player.nest_hub_ma"
      | "media_player.google_home_mini_ma"
      | "media_player.home_assistant_voice_0969ee_media_player_2"
      | "sensor.energy_production_today"
      | "sensor.energy_production_today_remaining"
      | "sensor.energy_production_tomorrow"
      | "sensor.power_highest_peak_time_today"
      | "sensor.power_highest_peak_time_tomorrow"
      | "sensor.power_production_now"
      | "sensor.energy_current_hour"
      | "sensor.energy_next_hour"
      | "camera.buienradar"
      | "weather.huis"
      | "tts.elevenlabs"
      | "button.shelly_plus_1_reboot"
      | "event.shellyplus1_a8032ab8a210_input_0"
      | "switch.garage_door"
      | "update.shelly_plus_1_firmware_update"
      | "binary_sensor.zonnescherm_overheating"
      | "button.zonnescherm_reboot"
      | "cover.zonnescherm"
      | "sensor.zonnescherm_power"
      | "sensor.zonnescherm_energy"
      | "sensor.woonkamer_audio_input_format"
      | "binary_sensor.woonkamer_microphone"
      | "media_player.sonos_living_room"
      | "select.home_assistant_voice_0969ee_assistant"
      | "select.home_assistant_voice_0969ee_finished_speaking_detection"
      | "select.home_assistant_voice_0969ee_wake_word"
      | "switch.home_assistant_voice_0969ee_mute"
      | "switch.home_assistant_voice_0969ee_wake_sound"
      | "media_player.home_assistant_voice_0969ee_media_player"
      | "light.home_assistant_voice_0969ee_led_ring"
      | "event.home_assistant_voice_0969ee_button_press"
      | "select.home_assistant_voice_0969ee_wake_word_sensitivity"
      | "update.home_assistant_voice_0969ee_home_assistant_voice_0969ee"
      | "weather.buienradar"
      | "binary_sensor.voordeur_motion_detected"
      | "binary_sensor.voordeur_person_detected"
      | "binary_sensor.garage_pet_detected"
      | "binary_sensor.garage_sound_detected"
      | "binary_sensor.garage_crying_detected"
      | "binary_sensor.voordeur_snooze"
      | "binary_sensor.garage_motion_detected"
      | "binary_sensor.garage_person_detected"
      | "binary_sensor.garage_pet_detected_2"
      | "binary_sensor.garage_sound_detected_2"
      | "binary_sensor.garage_crying_detected_2"
      | "binary_sensor.garage_snooze"
      | "binary_sensor.voordeur_debug_device"
      | "binary_sensor.garage_debug_device"
      | "binary_sensor.homebase_3_debug_station"
      | "select.voordeur_nightvision"
      | "select.voordeur_speaker_volume"
      | "select.voordeur_power_source"
      | "select.voordeur_power_working_mode"
      | "select.garage_nightvision"
      | "select.garage_speaker_volume"
      | "select.garage_power_source"
      | "select.garage_power_working_mode"
      | "select.homebase_3_guard_mode"
      | "sensor.voordeur_battery_percentage"
      | "sensor.voordeur_battery_temperature"
      | "sensor.voordeur_wifi_rssi"
      | "sensor.voordeur_wifi_signal_level"
      | "sensor.voordeur_person_name"
      | "sensor.voordeur_rtsp_stream_url"
      | "sensor.voordeur_charging_status"
      | "sensor.voordeur_snooze_time"
      | "sensor.voordeur_snooze_start_time"
      | "sensor.garage_battery_percentage"
      | "sensor.garage_battery_temperature"
      | "sensor.garage_wifi_rssi"
      | "sensor.garage_wifi_signal_level"
      | "sensor.garage_person_name"
      | "sensor.garage_rtsp_stream_url"
      | "sensor.garage_charging_status"
      | "sensor.garage_snooze_time"
      | "sensor.garage_snooze_start_time"
      | "sensor.homebase_3_current_mode"
      | "sensor.voordeur_stream_provider"
      | "sensor.voordeur_stream_url"
      | "sensor.voordeur_stream_status"
      | "sensor.voordeur_video_queue_size"
      | "sensor.garage_stream_provider"
      | "sensor.garage_stream_url"
      | "sensor.garage_stream_status"
      | "sensor.garage_video_queue_size"
      | "switch.voordeur_camera_enabled"
      | "switch.voordeur_antitheft_detection"
      | "switch.voordeur_status_led"
      | "switch.voordeur_motion_detection"
      | "switch.garage_motion_detection_type_human"
      | "switch.garage_motion_detection_type_human_recognition"
      | "switch.garage_motion_detection_type_pet"
      | "switch.garage_motion_detection_type_vehicle"
      | "switch.garage_motion_detection_type_all_other_motions"
      | "switch.voordeur_rtsp_stream"
      | "switch.voordeur_light"
      | "switch.voordeur_microphone"
      | "switch.voordeur_speaker"
      | "switch.voordeur_audio_recording"
      | "switch.garage_camera_enabled"
      | "switch.garage_antitheft_detection"
      | "switch.garage_status_led"
      | "switch.garage_motion_detection"
      | "switch.garage_motion_detection_type_human_2"
      | "switch.garage_motion_detection_type_human_recognition_2"
      | "switch.garage_motion_detection_type_pet_2"
      | "switch.garage_motion_detection_type_vehicle_2"
      | "switch.garage_motion_detection_type_all_other_motions_2"
      | "switch.garage_rtsp_stream"
      | "switch.garage_light"
      | "switch.garage_microphone"
      | "switch.garage_speaker"
      | "switch.garage_audio_recording"
      | "alarm_control_panel.homebase_3"
      | "number.voordeur_motion_detection_sensitivity"
      | "number.voordeur_light_brightness_manual"
      | "number.garage_motion_detection_sensitivity"
      | "number.garage_light_brightness_manual"
      | "number.homebase_3_prompt_volume"
      | "number.homebase_3_alarm_volume"
      | "camera.voordeur"
      | "camera.garage"
      | "button.voordeur_start_p2p_stream"
      | "button.voordeur_stop_p2p_stream"
      | "button.voordeur_start_rtsp_stream"
      | "button.voordeur_stop_rtsp_stream"
      | "button.voordeur_trigger_alarm"
      | "button.voordeur_reset_alarm"
      | "button.garage_start_p2p_stream"
      | "button.garage_stop_p2p_stream"
      | "button.garage_trigger_alarm"
      | "button.garage_reset_alarm"
      | "image.voordeur_event_image"
      | "image.garage_event_image"
      | "number.woonkamer_audio_delay"
      | "number.woonkamer_bass"
      | "number.living_room_balance"
      | "number.woonkamer_treble"
      | "number.woonkamer_sub_gain"
      | "number.woonkamer_surround_level"
      | "number.woonkamer_music_surround_level"
      | "switch.sonos_woonkamer_crossfade"
      | "switch.woonkamer_loudness"
      | "switch.woonkamer_surround_music_full_volume"
      | "switch.sonos_woonkamer_night_sound"
      | "switch.sonos_woonkamer_speech_enhancement"
      | "switch.sonos_woonkamer_subwoofer_enabled"
      | "switch.sonos_woonkamer_surround_enabled"
      | "binary_sensor.roborock_s8_mop_attached"
      | "binary_sensor.roborock_s8_water_box_attached"
      | "binary_sensor.roborock_s8_water_shortage"
      | "binary_sensor.roborock_s8_cleaning"
      | "binary_sensor.roborock_s8_charging"
      | "image.roborock_s8_onderverdieping"
      | "image.roborock_s8_bovenverdieping"
      | "image.roborock_s8_badkamer"
      | "image.roborock_s8_zolder"
      | "select.roborock_s8_mop_intensity"
      | "select.roborock_s8_mop_mode"
      | "select.roborock_s8_dock_empty_mode"
      | "select.roborock_s8_selected_map"
      | "sensor.roborock_s8_main_brush_time_left"
      | "sensor.roborock_s8_side_brush_time_left"
      | "sensor.roborock_s8_filter_time_left"
      | "sensor.roborock_s8_sensor_time_left"
      | "sensor.roborock_s8_cleaning_time"
      | "sensor.roborock_s8_total_cleaning_time"
      | "sensor.roborock_s8_total_cleaning_count"
      | "sensor.roborock_s8_status"
      | "sensor.roborock_s8_cleaning_area"
      | "sensor.roborock_s8_total_cleaning_area"
      | "sensor.roborock_s8_vacuum_error"
      | "sensor.roborock_s8_battery"
      | "sensor.roborock_s8_last_clean_begin"
      | "sensor.roborock_s8_last_clean_end"
      | "sensor.roborock_s8_cleaning_progress"
      | "sensor.roborock_s8_dock_error"
      | "sensor.roborock_s8_current_room"
      | "vacuum.roborock_s8"
      | "number.roborock_s8_volume"
      | "switch.roborock_s8_child_lock"
      | "switch.roborock_s8_do_not_disturb"
      | "time.roborock_s8_do_not_disturb_begin"
      | "time.roborock_s8_do_not_disturb_end"
      | "button.roborock_s8_pet_area_cleaning"
      | "button.roborock_s8_deep"
      | "button.roborock_s8_full_cleaning"
      | "light.woonkamer"
      | "light.kantoor_2"
      | "light.keuken"
      | "light.benedenverdieping"
      | "light.slaapkamer"
      | "light.hal"
      | "light.spotjes_keuken"
      | "light.bovenverdieping"
      | "light.spotjes"
      | "light.kleedkamer_2"
      | "light.zolder"
      | "sensor.zonneplan_current_usage"
      | "sensor.zonneplan_current_usage_measured_at"
      | "sensor.zonneplan_sustainability_score"
      | "sensor.zonneplan_current_tariff_group"
      | "sensor.zonneplan_current_electricity_tariff"
      | "sensor.zonneplan_current_gas_tariff"
      | "sensor.zonneplan_next_gas_tariff"
      | "sensor.zonneplan_status_message"
      | "sensor.zonneplan_status_tip"
      | "sensor.zonneplan_forcast_tariff_hour_1"
      | "sensor.zonneplan_forcast_tariff_hour_2"
      | "sensor.zonneplan_forcast_tariff_hour_3"
      | "sensor.zonneplan_forcast_tariff_hour_4"
      | "sensor.zonneplan_forcast_tariff_hour_5"
      | "sensor.zonneplan_forcast_tariff_hour_6"
      | "sensor.zonneplan_forcast_tariff_hour_7"
      | "sensor.zonneplan_forcast_tariff_hour_8"
      | "sensor.zonneplan_forcast_tariff_group_hour_1"
      | "sensor.zonneplan_forcast_tariff_group_hour_2"
      | "sensor.zonneplan_forcast_tariff_group_hour_3"
      | "sensor.zonneplan_forcast_tariff_group_hour_4"
      | "sensor.zonneplan_forcast_tariff_group_hour_5"
      | "sensor.zonneplan_forcast_tariff_group_hour_6"
      | "sensor.zonneplan_forcast_tariff_group_hour_7"
      | "sensor.zonneplan_forcast_tariff_group_hour_8"
      | "sensor.zonneplan_yield_today"
      | "sensor.zonneplan_yield_total"
      | "sensor.zonneplan_last_measured_value"
      | "sensor.zonneplan_last_measured"
      | "sensor.zonneplan_electricity_consumption_today"
      | "sensor.zonneplan_electricity_returned_today"
      | "sensor.zonneplan_electricity_delivery_costs_today"
      | "sensor.zonneplan_electricity_production_costs_today"
      | "sensor.zonneplan_gas_consumption_today"
      | "sensor.zonneplan_gas_delivery_costs_today"
      | "sensor.connect_energiemeter_electricity_consumption"
      | "sensor.connect_energiemeter_electricity_production"
      | "sensor.connect_energiemeter_electricity_average"
      | "sensor.connect_energiemeter_electricity_last_measured"
      | "sensor.connect_energiemeter_electricity_last_measured_production"
      | "sensor.connect_energiemeter_gas_last_measured"
      | "binary_sensor.zonneplan_one_omvormer_power_limit_active"
      | "binary_sensor.xiaomi_pad_5_kiosk_mode"
      | "binary_sensor.xiaomi_pad_5_plugged_in"
      | "binary_sensor.xiaomi_pad_5_device_admin"
      | "button.xiaomi_pad_5_restart_browser"
      | "button.xiaomi_pad_5_restart_device"
      | "button.xiaomi_pad_5_bring_to_foreground"
      | "button.xiaomi_pad_5_send_to_background"
      | "button.xiaomi_pad_5_load_start_url"
      | "camera.xiaomi_pad_5"
      | "image.xiaomi_pad_5_screenshot"
      | "media_player.xiaomi_pad_5"
      | "notify.xiaomi_pad_5_overlay_message"
      | "notify.xiaomi_pad_5_text_to_speech"
      | "number.xiaomi_pad_5_screensaver_timer"
      | "number.xiaomi_pad_5_screensaver_brightness"
      | "number.xiaomi_pad_5_screen_off_timer"
      | "number.xiaomi_pad_5_screen_brightness"
      | "sensor.xiaomi_pad_5_battery"
      | "sensor.xiaomi_pad_5_current_page"
      | "sensor.xiaomi_pad_5_screen_orientation"
      | "sensor.xiaomi_pad_5_foreground_app"
      | "sensor.xiaomi_pad_5_internal_storage_free_space"
      | "sensor.xiaomi_pad_5_internal_storage_total_space"
      | "sensor.xiaomi_pad_5_free_memory"
      | "sensor.xiaomi_pad_5_total_memory"
      | "switch.xiaomi_pad_5_screensaver"
      | "switch.xiaomi_pad_5_maintenance_mode"
      | "switch.xiaomi_pad_5_kiosk_lock"
      | "switch.xiaomi_pad_5_motion_detection"
      | "switch.xiaomi_pad_5_screen"
      | "assist_satellite.home_assistant_voice_0969ee_assist_satellite"
      | "binary_sensor.bambu_lab_p1s_recording_timelapse"
      | "binary_sensor.bambu_lab_p1s_extruder_filament_state"
      | "binary_sensor.bambu_lab_p1s_hms_errors"
      | "binary_sensor.bambu_lab_p1s_print_error"
      | "binary_sensor.bambu_lab_p1s_online"
      | "binary_sensor.bambu_lab_p1s_firmware_update"
      | "binary_sensor.bambu_lab_p1s_developer_lan_mode"
      | "binary_sensor.bambu_lab_p1s_mqtt_encryption_firmware"
      | "button.bambu_lab_p1s_pause_printing"
      | "button.bambu_lab_p1s_resume_printing"
      | "button.bambu_lab_p1s_stop_printing"
      | "button.bambu_lab_p1s_force_refresh_data"
      | "camera.bambu_lab_p1s_camera"
      | "fan.bambu_lab_p1s_cooling_fan"
      | "fan.bambu_lab_p1s_aux_fan"
      | "fan.bambu_lab_p1s_chamber_fan"
      | "image.bambu_lab_p1s_cover_image"
      | "image.bambu_lab_p1s_pick_image"
      | "light.bambu_lab_p1s_chamber_light"
      | "number.bambu_lab_p1s_nozzle_target_temperature"
      | "number.bambu_lab_p1s_bed_target_temperature"
      | "select.bambu_lab_p1s_printing_speed"
      | "sensor.bambu_lab_external_spool_external_spool"
      | "sensor.bambu_lab_p1s_mqtt_connection_mode"
      | "sensor.bambu_lab_p1s_wi_fi_signal"
      | "sensor.bambu_lab_p1s_bed_temperature"
      | "sensor.bambu_lab_p1s_target_bed_temperature"
      | "sensor.bambu_lab_p1s_nozzle_temperature"
      | "sensor.bambu_lab_p1s_nozzle_target_temperature"
      | "sensor.bambu_lab_p1s_aux_fan_speed"
      | "sensor.bambu_lab_p1s_chamber_fan_speed"
      | "sensor.bambu_lab_p1s_cooling_fan_speed"
      | "sensor.bambu_lab_p1s_heatbreak_fan_speed"
      | "sensor.bambu_lab_p1s_speed_profile"
      | "sensor.bambu_lab_p1s_current_stage"
      | "sensor.bambu_lab_p1s_print_progress"
      | "sensor.bambu_lab_p1s_print_status"
      | "sensor.bambu_lab_p1s_printable_objects"
      | "sensor.bambu_lab_p1s_sd_card_status"
      | "sensor.bambu_lab_p1s_skipped_objects"
      | "sensor.bambu_lab_p1s_start_time"
      | "sensor.bambu_lab_p1s_remaining_time"
      | "sensor.bambu_lab_p1s_end_time"
      | "sensor.bambu_lab_p1s_total_usage"
      | "sensor.bambu_lab_p1s_current_layer"
      | "sensor.bambu_lab_p1s_total_layer_count"
      | "sensor.bambu_lab_p1s_gcode_filename"
      | "sensor.bambu_lab_p1s_gcode_file_downloaded"
      | "sensor.bambu_lab_p1s_task_name"
      | "sensor.bambu_lab_p1s_print_type"
      | "sensor.bambu_lab_p1s_print_length"
      | "sensor.bambu_lab_p1s_print_bed_type"
      | "sensor.bambu_lab_p1s_print_weight"
      | "sensor.bambu_lab_p1s_nozzle_size"
      | "sensor.bambu_lab_p1s_nozzle_type"
      | "sensor.bambu_lab_p1s_ip_address"
      | "switch.bambu_lab_p1s_enable_camera"
      | "switch.bambu_lab_p1s_use_image_sensor_camera"
      | "switch.bambu_lab_p1s_load_model_data_from_printer"
      | "switch.bambu_lab_p1s_save_gcode_file_in_ha"
      | "calendar.rensknoors_gmail_com"
      | "calendar.birthdays"
      | "calendar.clairebongers_gmail_com"
      | "calendar.feestdagen_in_nederland"
      | "calendar.persoonlijk_rens"
      | "calendar.gezin"
      | "calendar.family"
      | "sensor.power_monitoring_plug_last_restart_time"
      | "sensor.power_monitoring_plug_wifi_connect_count"
      | "sensor.power_monitoring_plug_mqtt_connect_count"
      | "sensor.power_monitoring_plug_restart_reason"
      | "sensor.power_monitoring_plug_ssid"
      | "switch.power_monitoring_plug"
      | "sensor.power_monitoring_plug_energy_totalstarttime"
      | "sensor.power_monitoring_plug_energy_total"
      | "sensor.power_monitoring_plug_energy_yesterday"
      | "sensor.power_monitoring_plug_energy_today"
      | "sensor.power_monitoring_plug_energy_power"
      | "sensor.power_monitoring_plug_energy_apparentpower"
      | "sensor.power_monitoring_plug_energy_reactivepower"
      | "sensor.power_monitoring_plug_energy_factor"
      | "sensor.power_monitoring_plug_energy_voltage"
      | "sensor.power_monitoring_plug_energy_current"
      | "automation.leaving_home"
      | "automation.coming_home"
      | "automation.start_movie_mode"
      | "automation.turn_off_movie_mode"
      | "automation.turn_off_music_in_kitchen"
      | "automation.driveway_monitor_camera"
      | "automation.washing_machine"
      | "automation.key_reminder"
      | "automation.ha_update_notification"
      | "automation.subwoofer_nightmode"
      | "automation.window_open_climate_off_after_a_defined_time"
      | "automation.low_battery_level_detection_notification_for_all_battery_sensors"
      | "automation.lg_webos_tv_on"
      | "automation.ventilatie_aan_tijdens_douchen"
      | "automation.turn_off_hyperion_when_dimming_living_room_lights"
      | "automation.morning_routine"
      | "automation.new_automation"
      | "automation.turn_on_garden_lights_when_door_opens"
      | "automation.turn_off_garage_door_switch_in_the_night"
      | "automation.humidity_notification"
      | "automation.close_sunshade"
      | "automation.home_turn_on_garage_door_plug_when_manually_toggling_the_garage_door"
      | "automation.home_wallpanel_charging"
      | "automation.nfc_tag_bedroom_is_scanned"
      | "automation.notify_about_failing_backups"
      | "automation.widget_open_garage_on_widget_click"
      | "automation.toggle_christmas_tree_lights_on_via_niko_switch"
      | "automation.toggle_front_window_cover"
      | "automation.auto_stop_sleeping_noises"
      | "automation.warn_about_open_garage_door"
      | "binary_sensor.toilet_occupancy"
      | "binary_sensor.toilet_motion"
      | "binary_sensor.door_garden_livingroom_on_off"
      | "binary_sensor.lumi_lumi_sensor_magnet_aq2_on_off"
      | "binary_sensor.door_sensor_garage_door_opening"
      | "binary_sensor.garage_door_vibration_sensor"
      | "button.sonoff_temperature_garage_identify"
      | "button.garage_door_ce78080a_identify"
      | "button.sonoff_temperature_bedroom_identify"
      | "button.smartplug_wallpanel_identify"
      | "button.texasinstruments_ti_router_identify"
      | "button.smartplug_hal_bovenverdieping_fab5090a_identify"
      | "button.sonoff_temperature_attic_identify"
      | "button.ventilation_identify"
      | "button.lumi_lumi_sensor_motion_aq2_59e17007_identify"
      | "button.door_garden_livingroom_identify"
      | "button.lumi_lumi_sensor_magnet_aq2_identify"
      | "button.smartplug_3d_printer_identify"
      | "button.smartplug_washing_machine_identify"
      | "button.texasinstruments_ti_router_identify_2"
      | "button.zigbee_router_office_identify"
      | "button.door_sensor_garage_door_identify"
      | "button.bathroom_sensor_identify"
      | "button.garage_door_vibration_sensor_identify"
      | "cover.front_window_cover"
      | "light.ventilation_on_off"
      | "number.ventilation_level_start_up_current_level"
      | "select.ventilation_on_off_startuponoff"
      | "select.smartplug_3d_printer_power_on_state"
      | "select.smartplug_3d_printer_backlight_mode"
      | "select.smartplug_washing_machine_power_on_state"
      | "select.smartplug_washing_machine_backlight_mode"
      | "sensor.sonoff_temperature_garage_power"
      | "sensor.garage_temperature"
      | "sensor.garage_humidity"
      | "sensor.sonoff_temperature_bedroom_power"
      | "sensor.bedroom_temperature"
      | "sensor.bedroom_humidity"
      | "sensor.sonoff_temperature_attic_power"
      | "sensor.attic_temperature"
      | "sensor.attic_humidity"
      | "sensor.lumi_lumi_sensor_motion_aq2_59e17007_power"
      | "sensor.toilet_illuminance"
      | "sensor.toilet_temperature"
      | "sensor.door_garden_livingroom_power"
      | "sensor.door_garden_livingroom_temperature"
      | "sensor.lumi_lumi_sensor_magnet_aq2_power"
      | "sensor.lumi_lumi_sensor_magnet_aq2_device_temperature"
      | "sensor.smartplug_3d_printer_rms_current"
      | "sensor.smartplug_3d_printer_rms_voltage"
      | "sensor.smartplug_3d_printer_active_power"
      | "sensor.smartplug_3d_printer_summation_delivered"
      | "sensor.smartplug_washing_machine_rms_current"
      | "sensor.smartplug_washing_machine_rms_voltage"
      | "sensor.smartplug_washing_machine_active_power"
      | "sensor.smartplug_washing_machine_summation_delivered"
      | "sensor.door_sensor_garage_door_battery"
      | "sensor.bathroom_sensor_battery"
      | "sensor.bathroom_temperature"
      | "sensor.bathroom_humidity"
      | "sensor.garage_door_vibration_sensor_battery"
      | "sensor.garage_door_vibration_sensor_device_temperature"
      | "switch.garage_door_plug"
      | "switch.smartplug_wallpanel"
      | "switch.smartplug_hal_bovenverdieping"
      | "switch.smartplug_3d_printer_switch"
      | "switch.smartplug_3d_printer_child_lock"
      | "switch.smartplug_washing_machine_switch"
      | "switch.smartplug_washing_machine_child_lock"
      | "update.garage_door_firmware"
      | "update.smartplug_wallpanel_firmware"
      | "update.smartplug_hal_bovenverdieping_firmware"
      | "update.toilet_motion_firmware"
      | "update.smartplug_3d_printer_firmware"
      | "update.smartplug_washing_machine_firmware"
      | "update.zigbee_router_office_firmware"
      | "update.front_window_cover_firmware"
      | "update.garage_door_vibration_sensor_firmware"
      | "binary_sensor.updater"
      | "media_player.android_tv"
      | "fan.test_fan"
      | "sensor.030e8bf0_5c3c260a"
      | "sensor.16f2bb7b_bb8ea7b7"
      | "sensor.c7aef696_ffe591f9"
      | "sensor.1df730d8_02f1af06"
      | "sensor.7f975d4c_629d90e0"
      | "sensor.01ce87cc_a57da6d4"
      | "sensor.08febc97_d8ac530f"
      | "number.unnamed_room_bass"
      | "number.unnamed_room_treble"
      | "binary_sensor.unnamed_room_microphone"
      | "switch.unnamed_room_crossfade"
      | "switch.unnamed_room_loudness"
      | "number.unnamed_room_bass_2"
      | "number.unnamed_room_treble_2"
      | "switch.unnamed_room_crossfade_2"
      | "switch.unnamed_room_loudness_2"
      | "binary_sensor.unnamed_room_microphone_2"
      | "binary_sensor.homebase_alarm"
      | "binary_sensor.homebase_debug_station"
      | "select.voordeur_motion_detection_type"
      | "select.garage_motion_detection_type"
      | "select.homebase_guard_mode"
      | "sensor.voordeur_days_since_last_charging"
      | "sensor.garage_days_since_last_charging"
      | "sensor.homebase_current_mode"
      | "sensor.voordeur_video_codec"
      | "sensor.garage_video_codec"
      | "number.homebase_prompt_volume"
      | "number.homebase_alarm_volume"
      | "number.homebase_alarm_arm_delay"
      | "number.homebase_alarm_delay"
      | "button.garage_start_rtsp_stream"
      | "button.garage_stop_rtsp_stream"
      | "button.homebase_trigger_alarm"
      | "button.homebase_reset_alarm"
      | "button.homebase_reboot"
      | "sensor.smartplug_washing_machine_power_factor"
      | "image.roborock_s8"
      | "switch.automation_avond"
      | "binary_sensor.ib0819992320_connection_state"
      | "binary_sensor.ru1795430400_battery"
      | "binary_sensor.ru1795430400_connection_state"
      | "binary_sensor.warm_water_power"
      | "binary_sensor.warm_water_connectivity"
      | "binary_sensor.warm_water_overlay"
      | "sensor.thuis_outdoor_temperature"
      | "sensor.thuis_solar_percentage"
      | "sensor.thuis_weather_condition"
      | "sensor.thuis_tado_mode"
      | "sensor.thuis_geofencing_mode"
      | "sensor.thuis_automatic_geofencing"
      | "sensor.warm_water_tado_mode"
      | "water_heater.warm_water"
      | "climate.tado"
      | "binary_sensor.tado_connectivity"
      | "binary_sensor.tado_early_start"
      | "sensor.tado_heating"
      | "sensor.tado_humidity"
      | "binary_sensor.tado_overlay"
      | "binary_sensor.tado_power"
      | "sensor.tado_tado_mode"
      | "sensor.tado_temperature"
      | "binary_sensor.tado_window"
      | "device_tracker.claire_s_telefoon_2"
      | "device_tracker.rens_iphone_2"
      | "sensor.front_window_cover_window_covering_type"
      | "sensor.zonneplan_one_omvormer_current_scenario"
      | "sensor.smartplug_3d_printer_power_factor"
      | "sensor.bambu_lab_p1s_active_tray"
      | "sensor.bambu_lab_p1s_active_tray_index"
      | "image.bambu_lab_p1s_camera"
      | "switch.bambu_lab_p1s_manual_refresh_mode"
      | "sensor.bambu_lab_ams_humidity_index"
      | "sensor.bambu_lab_ams_tray_1"
      | "sensor.bambu_lab_ams_tray_2"
      | "sensor.bambu_lab_ams_tray_3"
      | "sensor.bambu_lab_ams_tray_4"
      | "binary_sensor.backups_stale"
      | "sensor.backup_state";
  }
}
