// this is an auto generated file, do not change this manually

import { ServiceFunction, ServiceFunctionTypes } from "@hakit/core";
declare module "@hakit/core" {
  export interface CustomSupportedServices<
    T extends ServiceFunctionTypes = "target",
  > {
    persistentNotification: {
      // Shows a notification on the **Notifications** panel.
      create: ServiceFunction<
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
      // Removes a notification from the **Notifications** panel.
      dismiss: ServiceFunction<
        T,
        {
          // ID of the notification to be removed. @example 1234
          notification_id: string;
        }
      >;
      // Removes all notifications from the **Notifications** panel.
      dismissAll: ServiceFunction<T, object>;
    };
    homeassistant: {
      // Saves the persistent states immediately. Maintains the normal periodic saving interval.
      savePersistentStates: ServiceFunction<T, object>;
      // Generic service to turn devices off under any domain.
      turnOff: ServiceFunction<T, object>;
      // Generic service to turn devices on under any domain.
      turnOn: ServiceFunction<T, object>;
      // Generic service to toggle devices on/off under any domain.
      toggle: ServiceFunction<T, object>;
      // Stops Home Assistant.
      stop: ServiceFunction<T, object>;
      // Restarts Home Assistant.
      restart: ServiceFunction<T, object>;
      // Checks the Home Assistant YAML-configuration files for errors. Errors will be shown in the Home Assistant logs.
      checkConfig: ServiceFunction<T, object>;
      // Forces one or more entities to update its data.
      updateEntity: ServiceFunction<T, object>;
      // Reloads the core configuration from the YAML-configuration.
      reloadCoreConfig: ServiceFunction<T, object>;
      // Updates the Home Assistant location.
      setLocation: ServiceFunction<
        T,
        {
          // Latitude of your location. @example 32.87336
          latitude: number;
          // Longitude of your location. @example 117.22743
          longitude: number;
          // Elevation of your location. @example 120
          elevation?: number;
        }
      >;
      // Reloads Jinja2 templates found in the `custom_templates` folder in your config. New values will be applied on the next render of the template.
      reloadCustomTemplates: ServiceFunction<T, object>;
      // Reloads the specified config entry.
      reloadConfigEntry: ServiceFunction<
        T,
        {
          // The configuration entry ID of the entry to be reloaded. @example 8955375327824e14ba89e4b29cc3ec9a
          entry_id?: string;
        }
      >;
      // Reload all YAML configuration that can be reloaded without restarting Home Assistant.
      reloadAll: ServiceFunction<T, object>;
    };
    systemLog: {
      // Clears all log entries.
      clear: ServiceFunction<T, object>;
      // Write log entry.
      write: ServiceFunction<
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
        T,
        {
          // Default severity level for all integrations.
          level?: "debug" | "info" | "warning" | "error" | "fatal" | "critical";
        }
      >;
      // Sets the log level for one or more integrations.
      setLevel: ServiceFunction<T, object>;
    };
    person: {
      // Reloads persons from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    recorder: {
      // Starts purge task - to clean up old data from your database.
      purge: ServiceFunction<
        T,
        {
          // Number of days to keep the data in the database. Starting today, counting backward. A value of `7` means that everything older than a week will be purged.
          keep_days?: number;
          // Attempt to save disk space by rewriting the entire database file.
          repack?: boolean;
          // Apply `entity_id` and `event_type` filters in addition to time-based purge.
          apply_filter?: boolean;
        }
      >;
      // Starts a purge task to remove the data related to specific entities from your database.
      purgeEntities: ServiceFunction<
        T,
        {
          // List of domains for which the data needs to be removed from the recorder database. @example sun
          domains?: object;
          // List of glob patterns used to select the entities for which the data is to be removed from the recorder database. @example domain*.object_id*
          entity_globs?: object;
          // Number of days to keep the data for rows matching the filter. Starting today, counting backward. A value of `7` means that everything older than a week will be purged. The default of 0 days will remove all matching rows immediately.
          keep_days?: number;
        }
      >;
      // Starts the recording of events and state changes.
      enable: ServiceFunction<T, object>;
      // Stops the recording of events and state changes.
      disable: ServiceFunction<T, object>;
    };
    frontend: {
      // Sets the default theme Home Assistant uses. Can be overridden by a user.
      setTheme: ServiceFunction<
        T,
        {
          // Name of a theme. @example default
          name: object;
          // Theme mode.
          mode?: "dark" | "light";
        }
      >;
      // Reloads themes from the YAML-configuration.
      reloadThemes: ServiceFunction<T, object>;
    };
    hassio: {
      // Starts an add-on.
      addonStart: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Stops an add-on.
      addonStop: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Restarts an add-on.
      addonRestart: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Updates an add-on. This service should be used with caution since add-on updates can contain breaking changes. It is highly recommended that you review release notes/change logs before updating an add-on.
      addonUpdate: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Writes data to add-on stdin.
      addonStdin: ServiceFunction<
        T,
        {
          // The add-on slug. @example core_ssh
          addon: object;
        }
      >;
      // Powers off the host system.
      hostShutdown: ServiceFunction<T, object>;
      // Reboots the host system.
      hostReboot: ServiceFunction<T, object>;
      // Creates a full backup.
      backupFull: ServiceFunction<
        T,
        {
          // Optional (default = current date and time). @example Backup 1
          name?: string;
          // Password to protect the backup with. @example password
          password?: string;
          // Compresses the backup files.
          compressed?: boolean;
          // Name of a backup network storage to host backups. @example my_backup_mount
          location?: object;
          // Exclude the Home Assistant database file from backup
          homeassistant_exclude_database?: boolean;
        }
      >;
      // Creates a partial backup.
      backupPartial: ServiceFunction<
        T,
        {
          // Includes Home Assistant settings in the backup.
          homeassistant?: boolean;
          // Exclude the Home Assistant database file from backup
          homeassistant_exclude_database?: boolean;
          // List of add-ons to include in the backup. Use the name slug of the add-on. @example core_ssh,core_samba,core_mosquitto
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
          location?: object;
        }
      >;
      // Restores from full backup.
      restoreFull: ServiceFunction<
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
        T,
        {
          // Slug of backup to restore from.
          slug: string;
          // Restores Home Assistant.
          homeassistant?: boolean;
          // List of directories to include in the backup. @example homeassistant,share
          folders?: object;
          // List of add-ons to include in the backup. Use the name slug of the add-on. @example core_ssh,core_samba,core_mosquitto
          addons?: object;
          // Optional password. @example password
          password?: string;
        }
      >;
    };
    update: {
      // Installs an update for this device or service.
      install: ServiceFunction<
        T,
        {
          // The version to install. If omitted, the latest version will be installed. @example 1.0.0
          version?: string;
          // If supported by the integration, this creates a backup before starting the update .
          backup?: boolean;
        }
      >;
      // Marks currently available update as skipped.
      skip: ServiceFunction<T, object>;
      // Removes the skipped version marker from an update.
      clearSkipped: ServiceFunction<T, object>;
    };
    cloud: {
      // Makes the instance UI accessible from outside of the local network by using Home Assistant Cloud.
      remoteConnect: ServiceFunction<T, object>;
      // Disconnects the Home Assistant UI from the Home Assistant Cloud. You will no longer be able to access your Home Assistant instance from outside your local network.
      remoteDisconnect: ServiceFunction<T, object>;
    };
    ffmpeg: {
      // Sends a start command to a ffmpeg based sensor.
      start: ServiceFunction<
        T,
        {
          // Name of entity that will start. Platform dependent.
          entity_id?: string;
        }
      >;
      // Sends a stop command to a ffmpeg based sensor.
      stop: ServiceFunction<
        T,
        {
          // Name of entity that will stop. Platform dependent.
          entity_id?: string;
        }
      >;
      // Sends a restart command to a ffmpeg based sensor.
      restart: ServiceFunction<
        T,
        {
          // Name of entity that will restart. Platform dependent.
          entity_id?: string;
        }
      >;
    };
    tts: {
      // Speaks something using text-to-speech on a media player.
      speak: ServiceFunction<
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
      clearCache: ServiceFunction<T, object>;
      // Say something using text-to-speech on a media player with google_translate.
      googleTranslateSay: ServiceFunction<
        T,
        {
          // undefined
          entity_id: string;
          // undefined @example My name is hanna
          message: string;
          // undefined
          cache?: boolean;
          // undefined @example ru
          language?: string;
          // undefined @example platform specific
          options?: object;
        }
      >;
      // Say something using text-to-speech on a media player with cloud.
      cloudSay: ServiceFunction<
        T,
        {
          // undefined
          entity_id: string;
          // undefined @example My name is hanna
          message: string;
          // undefined
          cache?: boolean;
          // undefined @example ru
          language?: string;
          // undefined @example platform specific
          options?: object;
        }
      >;
    };
    trend: {
      // Reloads trend sensors from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    scene: {
      // Reloads the scenes from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Activates a scene with configuration.
      apply: ServiceFunction<
        T,
        {
          // List of entities and their target state. @example light.kitchen: 'on' light.ceiling:   state: 'on'   brightness: 80
          entities: object;
          // Time it takes the devices to transition into the states defined in the scene.
          transition?: number;
        }
      >;
      // Creates a new scene.
      create: ServiceFunction<
        T,
        {
          // The entity ID of the new scene. @example all_lights
          scene_id: string;
          // List of entities and their target state. If your entities are already in the target state right now, use `snapshot_entities` instead. @example light.tv_back_light: 'on' light.ceiling:   state: 'on'   brightness: 200
          entities?: object;
          // List of entities to be included in the snapshot. By taking a snapshot, you record the current state of those entities. If you do not want to use the current state of all your entities for this scene, you can combine the `snapshot_entities` with `entities`. @example - light.ceiling - light.kitchen
          snapshot_entities?: string;
        }
      >;
      // Deletes a dynamically created scene.
      delete: ServiceFunction<T, object>;
      // Activates a scene.
      turnOn: ServiceFunction<
        T,
        {
          // Time it takes the devices to transition into the states defined in the scene.
          transition?: number;
        }
      >;
    };
    timer: {
      // Reloads timers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Starts a timer.
      start: ServiceFunction<
        T,
        {
          // Duration the timer requires to finish. [optional]. @example 00:01:00 or 60
          duration?: string;
        }
      >;
      // Pauses a timer.
      pause: ServiceFunction<T, object>;
      // Cancels a timer.
      cancel: ServiceFunction<T, object>;
      // Finishes a timer.
      finish: ServiceFunction<T, object>;
      // Changes a timer.
      change: ServiceFunction<
        T,
        {
          // Duration to add or subtract to the running timer. @example 00:01:00, 60 or -60
          duration: string;
        }
      >;
    };
    conversation: {
      // Launches a conversation from a transcribed text.
      process: ServiceFunction<
        T,
        {
          // Transcribed text input. @example Turn all lights on
          text: string;
          // Language of text. Defaults to server language. @example NL
          language?: string;
          // Conversation agent to process your request. The conversation agent is the brains of your assistant. It processes the incoming text commands. @example homeassistant
          agent_id?: object;
          // ID of the conversation, to be able to continue a previous conversation @example my_conversation_1
          conversation_id?: string;
        }
      >;
      // Reloads the intent configuration.
      reload: ServiceFunction<
        T,
        {
          // Language to clear cached intents for. Defaults to server language. @example NL
          language?: string;
          // Conversation agent to reload. @example homeassistant
          agent_id?: object;
        }
      >;
    };
    inputNumber: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Sets the value.
      setValue: ServiceFunction<
        T,
        {
          // The target value.
          value: number;
        }
      >;
      // Increments the value by 1 step.
      increment: ServiceFunction<T, object>;
      // Decrements the current value by 1 step.
      decrement: ServiceFunction<T, object>;
    };
    logbook: {
      // Creates a custom entry in the logbook.
      log: ServiceFunction<
        T,
        {
          // Custom name for an entity, can be referenced using an `entity_id`. @example Kitchen
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
    group: {
      // Reloads group configuration, entities, and notify services from YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Creates/Updates a user group.
      set: ServiceFunction<
        T,
        {
          // Object ID of this group. This object ID is used as part of the entity ID. Entity ID format: [domain].[object_id]. @example test_group
          object_id: string;
          // Name of the group. @example My test group
          name?: string;
          // Name of the icon for the group. @example mdi:camera
          icon?: object;
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
        T,
        {
          // Object ID of this group. This object ID is used as part of the entity ID. Entity ID format: [domain].[object_id]. @example test_group
          object_id: object;
        }
      >;
    };
    light: {
      // Turn on one or more lights and adjust properties of the light, even when they are turned on already.
      turnOn: ServiceFunction<
        T,
        {
          // Duration it takes to get to next state.
          transition?: number;
          // The color in RGB format. A list of three integers between 0 and 255 representing the values of red, green, and blue.
          rgb_color?: [number, number, number];
          // The color in RGBW format. A list of four integers between 0 and 255 representing the values of red, green, blue, and white. @example [255, 100, 100, 50]
          rgbw_color?: [number, number, number, number];
          // The color in RGBWW format. A list of five integers between 0 and 255 representing the values of red, green, blue, cold white, and warm white. @example [255, 100, 100, 50, 70]
          rgbww_color?: [number, number, number, number, number];
          // A human-readable color name.
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
          // Color in hue/sat format. A list of two integers. Hue is 0-360 and Sat is 0-100. @example [300, 70]
          hs_color?: [number, number];
          // Color in XY-format. A list of two decimal numbers between 0 and 1. @example [0.52, 0.43]
          xy_color?: [number, number];
          // Color temperature in mireds.
          color_temp?: number | object;
          // Color temperature in Kelvin.
          kelvin?: number | object;
          // Number indicating brightness, where 0 turns the light off, 1 is the minimum brightness, and 255 is the maximum brightness.
          brightness?: number;
          // Number indicating the percentage of full brightness, where 0 turns the light off, 1 is the minimum brightness, and 100 is the maximum brightness.
          brightness_pct?: number;
          // Change brightness by an amount.
          brightness_step?: number;
          // Change brightness by a percentage.
          brightness_step_pct?: number;
          // Set the light to white mode.
          white?: boolean;
          // Name of a light profile to use. @example relax
          profile?: string;
          // Tell light to flash, can be either value short or long.
          flash?: "long" | "short";
          // Light effect.
          effect?: string;
        }
      >;
      // Turn off one or more lights.
      turnOff: ServiceFunction<
        T,
        {
          // Duration it takes to get to next state.
          transition?: number;
          // Tell light to flash, can be either value short or long.
          flash?: "long" | "short";
        }
      >;
      // Toggles one or more lights, from on to off, or, off to on, based on their current state.
      toggle: ServiceFunction<
        T,
        {
          // Duration it takes to get to next state.
          transition?: number;
          // The color in RGB format. A list of three integers between 0 and 255 representing the values of red, green, and blue. @example [255, 100, 100]
          rgb_color?: [number, number, number];
          // A human-readable color name.
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
          // Color in hue/sat format. A list of two integers. Hue is 0-360 and Sat is 0-100. @example [300, 70]
          hs_color?: [number, number];
          // Color in XY-format. A list of two decimal numbers between 0 and 1. @example [0.52, 0.43]
          xy_color?: [number, number];
          // Color temperature in mireds.
          color_temp?: number | object;
          // Color temperature in Kelvin.
          kelvin?: number | object;
          // Number indicating brightness, where 0 turns the light off, 1 is the minimum brightness, and 255 is the maximum brightness.
          brightness?: number;
          // Number indicating the percentage of full brightness, where 0 turns the light off, 1 is the minimum brightness, and 100 is the maximum brightness.
          brightness_pct?: number;
          // Set the light to white mode.
          white?: boolean;
          // Name of a light profile to use. @example relax
          profile?: string;
          // Tell light to flash, can be either value short or long.
          flash?: "long" | "short";
          // Light effect.
          effect?: string;
        }
      >;
    };
    inputButton: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Mimics the physical button press on the device.
      press: ServiceFunction<T, object>;
    };
    inputBoolean: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Turns on the helper.
      turnOn: ServiceFunction<T, object>;
      // Turns off the helper.
      turnOff: ServiceFunction<T, object>;
      // Toggles the helper on/off.
      toggle: ServiceFunction<T, object>;
    };
    zone: {
      // Reloads zones from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    inputSelect: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Selects the first option.
      selectFirst: ServiceFunction<T, object>;
      // Selects the last option.
      selectLast: ServiceFunction<T, object>;
      // Select the next option.
      selectNext: ServiceFunction<
        T,
        {
          // If the option should cycle from the last to the first option on the list.
          cycle?: boolean;
        }
      >;
      // Selects an option.
      selectOption: ServiceFunction<
        T,
        {
          // Option to be selected. @example 'Item A'
          option: string;
        }
      >;
      // Selects the previous option.
      selectPrevious: ServiceFunction<
        T,
        {
          // If the option should cycle from the last to the first option on the list.
          cycle?: boolean;
        }
      >;
      // Sets the options.
      setOptions: ServiceFunction<
        T,
        {
          // List of options. @example ['Item A', 'Item B', 'Item C']
          options: object;
        }
      >;
    };
    template: {
      // Reloads template entities from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    fan: {
      // Turns fan on.
      turnOn: ServiceFunction<
        T,
        {
          // Speed of the fan.
          percentage?: number;
          // Preset mode. @example auto
          preset_mode?: string;
        }
      >;
      // Turns fan off.
      turnOff: ServiceFunction<T, object>;
      // Toggles the fan on/off.
      toggle: ServiceFunction<T, object>;
      // Increases the speed of the fan.
      increaseSpeed: ServiceFunction<
        T,
        {
          // Increases the speed by a percentage step.
          percentage_step?: number;
        }
      >;
      // Decreases the speed of the fan.
      decreaseSpeed: ServiceFunction<
        T,
        {
          // Decreases the speed by a percentage step.
          percentage_step?: number;
        }
      >;
      // Controls oscillatation of the fan.
      oscillate: ServiceFunction<
        T,
        {
          // Turn on/off oscillation.
          oscillating: boolean;
        }
      >;
      // Sets the fan rotation direction.
      setDirection: ServiceFunction<
        T,
        {
          // Direction to rotate.
          direction: "forward" | "reverse";
        }
      >;
      // Sets the fan speed.
      setPercentage: ServiceFunction<
        T,
        {
          // Speed of the fan.
          percentage: number;
        }
      >;
      // Sets preset mode.
      setPresetMode: ServiceFunction<
        T,
        {
          // Preset mode. @example auto
          preset_mode: string;
        }
      >;
    };
    cover: {
      // Opens a cover.
      openCover: ServiceFunction<T, object>;
      // Closes a cover.
      closeCover: ServiceFunction<T, object>;
      // Moves a cover to a specific position.
      setCoverPosition: ServiceFunction<
        T,
        {
          // Target position.
          position: number;
        }
      >;
      // Stops the cover movement.
      stopCover: ServiceFunction<T, object>;
      // Toggles a cover open/closed.
      toggle: ServiceFunction<T, object>;
      // Tilts a cover open.
      openCoverTilt: ServiceFunction<T, object>;
      // Tilts a cover to close.
      closeCoverTilt: ServiceFunction<T, object>;
      // Stops a tilting cover movement.
      stopCoverTilt: ServiceFunction<T, object>;
      // Moves a cover tilt to a specific position.
      setCoverTiltPosition: ServiceFunction<
        T,
        {
          // Target tilt positition.
          tilt_position: number;
        }
      >;
      // Toggles a cover tilt open/closed.
      toggleCoverTilt: ServiceFunction<T, object>;
    };
    commandLine: {
      // Reloads command line configuration from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    webrtc: {
      // Create a temporary or permanent link to a stream (enter 'url' or 'entity')
      createLink: ServiceFunction<
        T,
        {
          // Create a random or permanent ID for your link @example fd0a53ca-e9ab-4e7a-86a2-441642b16ae1
          link_id: string;
          // Link to RTSP-stream @example rtsp://rtsp:12345678@192.168.1.123:554/av_stream/ch0
          url?: string;
          // Camera entity @example camera.generic_stream
          entity?: string;
          // How many times a link can be opened (0 - unlimit) @example 1
          open_limit?: number;
          // How many seconds will the link live (0 - unlimit) @example 60
          time_to_live?: number;
        }
      >;
      // Cast stream to Chromecast device via DashCast application
      dashCast: ServiceFunction<
        T,
        {
          // Media player entity @example media_player.mibox4
          entity_id: string;
          // Link to RTSP-stream @example rtsp://rtsp:12345678@192.168.1.123:554/av_stream/ch0
          url?: string;
          // Force restart DashCast application
          force?: boolean;
          // Camera entity @example camera.generic_stream
          entity?: string;
        }
      >;
    };
    tado: {
      // Add meter readings to Tado Energy IQ.
      addMeterReading: ServiceFunction<
        T,
        {
          // Config entry to add meter readings to.
          config_entry: object;
          // Reading in m³ or kWh without decimals.
          reading: number;
        }
      >;
      // Turns on climate entities for a set time.
      setClimateTimer: ServiceFunction<
        T,
        {
          // Temperature to set climate entity to.
          temperature: number;
          // Choose this or Overlay. Set the time period for the change if you want to be specific. Alternatively use Overlay. @example 01:30:00
          time_period?: string;
          // Choose this or Time Period. Allows you to choose an overlay. MANUAL:=Overlay until user removes; NEXT_TIME_BLOCK:=Overlay until next timeblock; TADO_DEFAULT:=Overlay based on tado app setting. @example MANUAL
          requested_overlay?: "NEXT_TIME_BLOCK" | "MANUAL" | "TADO_DEFAULT";
        }
      >;
      // Sets the temperature offset of climate entities.
      setClimateTemperatureOffset: ServiceFunction<
        T,
        {
          // Offset you would like (depending on your device).
          offset?: number;
        }
      >;
      // Turns on water heater for a set time.
      setWaterHeaterTimer: ServiceFunction<
        T,
        {
          // Set the time period for the boost. @example 01:30:00
          time_period: string;
          // Temperature to set heater to.
          temperature?: number;
        }
      >;
    };
    inputText: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Sets the value.
      setValue: ServiceFunction<
        T,
        {
          // The target value. @example This is an example text
          value: string;
        }
      >;
    };
    mqtt: {
      // Publishes a message to an MQTT topic.
      publish: ServiceFunction<
        T,
        {
          // Topic to publish to. @example /homeassistant/hello
          topic: string;
          // The payload to publish. @example This is great
          payload?: string;
          // Template to render as a payload value. If a payload is provided, the template is ignored. @example {{ states('sensor.temperature') }}
          payload_template?: object;
          // Quality of Service to use. 0: At most once. 1: At least once. 2: Exactly once.
          qos?: "0" | "1" | "2";
          // If the message should have the retain flag set. If set, the broker stores the most recent message on a topic.
          retain?: boolean;
        }
      >;
      // Writes all messages on a specific topic into the `mqtt_dump.txt` file in your configuration folder.
      dump: ServiceFunction<
        T,
        {
          // Topic to listen to. @example OpenZWave/#
          topic?: string;
          // How long we should listen for messages in seconds.
          duration?: number;
        }
      >;
      // Reloads MQTT entities from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    counter: {
      // Increments a counter.
      increment: ServiceFunction<T, object>;
      // Decrements a counter.
      decrement: ServiceFunction<T, object>;
      // Resets a counter.
      reset: ServiceFunction<T, object>;
      // Sets the counter value.
      setValue: ServiceFunction<
        T,
        {
          // The new counter value the entity should be set to.
          value: number;
        }
      >;
    };
    browserMod: {
      // Run a sequence of services
      sequence: ServiceFunction<
        T,
        {
          // List of services to run
          sequence?: object;
        }
      >;
      // Wait for a time
      delay: ServiceFunction<
        T,
        {
          // Time to wait (ms)
          time?: number;
        }
      >;
      // Display a popup
      popup: ServiceFunction<
        T,
        {
          // Popup title
          title?: string;
          // Popup content (Test or lovelace card configuration)
          content: object;
          //
          size?: "normal" | "wide" | "fullscreen";
          // Text of the right button
          right_button?: string;
          // Action to perform when the right button is pressed
          right_button_action?: object;
          // Text of the left button
          left_button?: string;
          // Action to perform when left button is pressed
          left_button_action?: object;
          // Whether the popup can be closed by the user without action
          dismissable?: boolean;
          // Action to perform when popup is dismissed
          dismiss_action?: object;
          // Close the popup automatically on mouse, pointer or keyboard activity
          autoclose?: boolean;
          // Time before closing (ms)
          timeout?: number;
          // Action to perform when popup is closed by timeout
          timeout_action?: object;
          // CSS code to apply to the popup window
          style?: string;
        }
      >;
      // Show more-info dialog
      moreInfo: ServiceFunction<
        T,
        {
          //
          entity: string;
          //
          large?: boolean;
          //
          ignore_popup_card?: boolean;
        }
      >;
      // Close a popup
      closePopup: ServiceFunction<T, object>;
      // Display a short notification
      notification: ServiceFunction<
        T,
        {
          // Message to display
          message: string;
          // Time before closing (ms)
          duration?: number;
          // Text of optional action button
          action_text?: string;
          // Action to perform when the action button is pressed
          action?: object;
        }
      >;
      // Navigate browser to a different page
      navigate: ServiceFunction<
        T,
        {
          // Target path
          path?: string;
        }
      >;
      // Refresh page
      refresh: ServiceFunction<T, object>;
      // Change the current theme
      setTheme: ServiceFunction<
        T,
        {
          // Name of theme or 'auto'
          theme?: string;
          // Dark/light mode
          dark?: "auto" | "light" | "dark";
          // Primary theme color
          primaryColor?: object;
          // Accent theme color
          accentColor?: object;
        }
      >;
      // Print text to browser console
      console: ServiceFunction<
        T,
        {
          // Text to print
          message?: string;
        }
      >;
      // Run arbitrary JavaScript code
      javascript: ServiceFunction<
        T,
        {
          // JavaScript code to run
          code?: object;
        }
      >;
    };
    mediaPlayer: {
      // Turns on the power of the media player.
      turnOn: ServiceFunction<T, object>;
      // Turns off the power of the media player.
      turnOff: ServiceFunction<T, object>;
      // Toggles a media player on/off.
      toggle: ServiceFunction<T, object>;
      // Turns up the volume.
      volumeUp: ServiceFunction<T, object>;
      // Turns down the volume.
      volumeDown: ServiceFunction<T, object>;
      // Toggles play/pause.
      mediaPlayPause: ServiceFunction<T, object>;
      // Starts playing.
      mediaPlay: ServiceFunction<T, object>;
      // Pauses.
      mediaPause: ServiceFunction<T, object>;
      // Stops playing.
      mediaStop: ServiceFunction<T, object>;
      // Selects the next track.
      mediaNextTrack: ServiceFunction<T, object>;
      // Selects the previous track.
      mediaPreviousTrack: ServiceFunction<T, object>;
      // Clears the playlist.
      clearPlaylist: ServiceFunction<T, object>;
      // Sets the volume level.
      volumeSet: ServiceFunction<
        T,
        {
          // The volume. 0 is inaudible, 1 is the maximum volume.
          volume_level: number;
        }
      >;
      // Mutes or unmutes the media player.
      volumeMute: ServiceFunction<
        T,
        {
          // Defines whether or not it is muted.
          is_volume_muted: boolean;
        }
      >;
      // Allows you to go to a different part of the media that is currently playing.
      mediaSeek: ServiceFunction<
        T,
        {
          // Target position in the currently playing media. The format is platform dependent.
          seek_position: number;
        }
      >;
      // Groups media players together for synchronous playback. Only works on supported multiroom audio systems.
      join: ServiceFunction<
        T,
        {
          // The players which will be synced with the playback specified in `target`. @example - media_player.multiroom_player2 - media_player.multiroom_player3
          group_members: string[];
        }
      >;
      // Sends the media player the command to change input source.
      selectSource: ServiceFunction<
        T,
        {
          // Name of the source to switch to. Platform dependent. @example video1
          source: string;
        }
      >;
      // Selects a specific sound mode.
      selectSoundMode: ServiceFunction<
        T,
        {
          // Name of the sound mode to switch to. @example Music
          sound_mode?: string;
        }
      >;
      // Starts playing specified media.
      playMedia: ServiceFunction<
        T,
        {
          // The ID of the content to play. Platform dependent. @example https://home-assistant.io/images/cast/splash.png
          media_content_id: string | number;
          // The type of the content to play. Such as image, music, tv show, video, episode, channel, or playlist. @example music
          media_content_type: string;
          // If the content should be played now or be added to the queue.
          enqueue?: "play" | "next" | "add" | "replace";
          // If the media should be played as an announcement. @example true
          announce?: boolean;
        }
      >;
      // Playback mode that selects the media in randomized order.
      shuffleSet: ServiceFunction<
        T,
        {
          // Whether or not shuffle mode is enabled.
          shuffle: boolean;
        }
      >;
      // Removes the player from a group. Only works on platforms which support player groups.
      unjoin: ServiceFunction<T, object>;
      // Playback mode that plays the media in a loop.
      repeatSet: ServiceFunction<
        T,
        {
          // Repeat mode to set.
          repeat: "off" | "all" | "one";
        }
      >;
    };
    camera: {
      // Enables the motion detection.
      enableMotionDetection: ServiceFunction<T, object>;
      // Disables the motion detection.
      disableMotionDetection: ServiceFunction<T, object>;
      // Turns off the camera.
      turnOff: ServiceFunction<T, object>;
      // Turns on the camera.
      turnOn: ServiceFunction<T, object>;
      // Takes a snapshot from a camera.
      snapshot: ServiceFunction<
        T,
        {
          // Template of a filename. Variable available is `entity_id`. @example /tmp/snapshot_{{ entity_id.name }}.jpg
          filename: string;
        }
      >;
      // Plays the camera stream on a supported media player.
      playStream: ServiceFunction<
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
        T,
        {
          // Template of a filename. Variable available is `entity_id`. Must be mp4. @example /tmp/snapshot_{{ entity_id.name }}.mp4
          filename: string;
          // Planned duration of the recording. The actual duration may vary.
          duration?: number;
          // Planned lookback period to include in the recording (in addition to the duration). Only available if there is currently an active HLS stream. The actual length of the lookback period may vary.
          lookback?: number;
        }
      >;
    };
    wakeOnLan: {
      // Sends a 'magic packet' to wake up a device with 'Wake-On-LAN' capabilities.
      sendMagicPacket: ServiceFunction<
        T,
        {
          // MAC address of the device to wake up. @example aa:bb:cc:dd:ee:ff
          mac: string;
          // Broadcast IP where to send the magic packet. @example 192.168.255.255
          broadcast_address?: string;
          // Port where to send the magic packet.
          broadcast_port?: number;
        }
      >;
    };
    script: {
      //
      castCameraToDrivewayMonitor: ServiceFunction<T, object>;
      //
      turnOffAllLights: ServiceFunction<T, object>;
      //
      ventilationOnFullSpeed: ServiceFunction<T, object>;
      //
      turnVentilationOff: ServiceFunction<T, object>;
      //
      goodMorning: ServiceFunction<T, object>;
      //
      toggleVentilation: ServiceFunction<T, object>;
      //
      timedBedroomFan: ServiceFunction<T, object>;
      //
      showHaSettingsOnTablet: ServiceFunction<T, object>;
      // Reloads all the available scripts.
      reload: ServiceFunction<T, object>;
      // Runs the sequence of actions defined in a script.
      turnOn: ServiceFunction<T, object>;
      // Stops a running script.
      turnOff: ServiceFunction<T, object>;
      // Toggle a script. Starts it, if isn't running, stops it otherwise.
      toggle: ServiceFunction<T, object>;
    };
    schedule: {
      // Reloads schedules from the YAML-configuration.
      reload: ServiceFunction<T, object>;
    };
    inputDatetime: {
      // Reloads helpers from the YAML-configuration.
      reload: ServiceFunction<T, object>;
      // Sets the date and/or time.
      setDatetime: ServiceFunction<
        T,
        {
          // The target date. @example '2019-04-20'
          date?: string;
          // The target time. @example '05:04:20'
          time?: object;
          // The target date & time. @example '2019-04-20 05:04:20'
          datetime?: string;
          // The target date & time, expressed by a UNIX timestamp.
          timestamp?: number;
        }
      >;
    };
    webostv: {
      // Sends a button press command.
      button: ServiceFunction<
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
        T,
        {
          // Name(s) of the webostv entities to change sound output on.
          entity_id: string;
          // Name of the sound output to switch to. @example external_speaker
          sound_output: string;
        }
      >;
    };
    googleAssistant: {
      // Sends a request_sync command to Google.
      requestSync: ServiceFunction<
        T,
        {
          // Only needed for automations. Specific Home Assistant user id (not username, ID in configuration > users > under username) to sync with Google Assistant. Do not need when you call this service through Home Assistant front end or API. Used in automation script or other place where context.user_id is missing.
          agent_user_id?: string;
        }
      >;
    };
    cast: {
      // Shows a dashboard view on a Chromecast device.
      showLovelaceView: ServiceFunction<
        T,
        {
          // Media player entity to show the dashboard view on.
          entity_id: string;
          // The URL path of the dashboard to show. @example lovelace-cast
          dashboard_path: string;
          // The path of the dashboard view to show. @example downstairs
          view_path?: string;
        }
      >;
    };
    weather: {
      // Get weather forecast.
      getForecast: ServiceFunction<
        T,
        {
          // Forecast type: daily, hourly or twice daily.
          type: "daily" | "hourly" | "twice_daily";
        }
      >;
      // Get weather forecasts.
      getForecasts: ServiceFunction<
        T,
        {
          // Forecast type: daily, hourly or twice daily.
          type: "daily" | "hourly" | "twice_daily";
        }
      >;
    };
    notify: {
      // Sends a notification that is visible in the **Notifications** panel.
      persistentNotification: ServiceFunction<
        T,
        {
          // Message body of the notification. @example The garage door has been open for 10 minutes.
          message: string;
          // Title of the notification. @example Your Garage Door Friend
          title?: string;
          // Some integrations provide extended functionality. For information on how to use _data_, refer to the integration documentation.. @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_renss_iphone integration.
      mobileAppRenssIphone: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_galaxy_watch5_yr0h integration.
      mobileAppGalaxyWatch5Yr0H: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_xiaomi_pad_5 integration.
      mobileAppXiaomiPad5: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_volvo integration.
      mobileAppVolvo: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the mobile_app_pixel_5 integration.
      mobileAppPixel5: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the notify service.
      notify: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the google_assistant_sdk service.
      googleAssistantSdk: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
      // Sends a notification message using the lg_c8 service.
      lgC8: ServiceFunction<
        T,
        {
          // undefined @example The garage door has been open for 10 minutes.
          message: string;
          // undefined @example Your Garage Door Friend
          title?: string;
          // undefined @example platform specific
          target?: object;
          // undefined @example platform specific
          data?: object;
        }
      >;
    };
    deviceTracker: {
      // Records a seen tracked device.
      see: ServiceFunction<
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
          // Accuracy of the GPS coordinates.
          gps_accuracy?: number;
          // Battery level of the device.
          battery?: number;
        }
      >;
    };
    button: {
      // Press the button entity.
      press: ServiceFunction<T, object>;
    };
    number: {
      // Sets the value of a number.
      setValue: ServiceFunction<
        T,
        {
          // The target value to set. @example 42
          value?: string;
        }
      >;
    };
    select: {
      // Selects the first option.
      selectFirst: ServiceFunction<T, object>;
      // Selects the last option.
      selectLast: ServiceFunction<T, object>;
      // Selects the next option.
      selectNext: ServiceFunction<
        T,
        {
          // If the option should cycle from the last to the first.
          cycle?: boolean;
        }
      >;
      // Selects an option.
      selectOption: ServiceFunction<
        T,
        {
          // Option to be selected. @example 'Item A'
          option: string;
        }
      >;
      // Selects the previous option.
      selectPrevious: ServiceFunction<
        T,
        {
          // If the option should cycle from the first to the last.
          cycle?: boolean;
        }
      >;
    };
    switch: {
      // Turns a switch off.
      turnOff: ServiceFunction<T, object>;
      // Turns a switch on.
      turnOn: ServiceFunction<T, object>;
      // Toggles a switch on/off.
      toggle: ServiceFunction<T, object>;
    };
    remote: {
      // Turns the device off.
      turnOff: ServiceFunction<T, object>;
      // Sends the power on command.
      turnOn: ServiceFunction<
        T,
        {
          // Activity ID or activity name to be started. @example BedroomTV
          activity?: string;
        }
      >;
      // Toggles a device on/off.
      toggle: ServiceFunction<T, object>;
      // Sends a command or a list of commands to a device.
      sendCommand: ServiceFunction<
        T,
        {
          // Device ID to send command to. @example 32756745
          device?: string;
          // A single command or a list of commands to send. @example Play
          command: object;
          // The number of times you want to repeat the commands.
          num_repeats?: number;
          // The time you want to wait in between repeated commands.
          delay_secs?: number;
          // The time you want to have it held before the release is send.
          hold_secs?: number;
        }
      >;
      // Learns a command or a list of commands from a device.
      learnCommand: ServiceFunction<
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
          // Timeout for the command to be learned.
          timeout?: number;
        }
      >;
      // Deletes a command or a list of commands from the database.
      deleteCommand: ServiceFunction<
        T,
        {
          // Device from which commands will be deleted. @example television
          device?: string;
          // The single command or the list of commands to be deleted. @example Mute
          command: object;
        }
      >;
    };
    fullyKiosk: {
      // Loads a URL on Fully Kiosk Browser.
      loadUrl: ServiceFunction<
        T,
        {
          // URL to load. @example https://home-assistant.io
          url: string;
        }
      >;
      // Starts an application on the device running Fully Kiosk Browser.
      startApplication: ServiceFunction<
        T,
        {
          // Package name of the application to start. @example de.ozerov.fully
          application: string;
        }
      >;
      // Sets a configuration parameter on Fully Kiosk Browser.
      setConfig: ServiceFunction<
        T,
        {
          // Configuration parameter to set. @example motionSensitivity
          key: string;
          // Value for the configuration parameter. @example 90
          value: string;
        }
      >;
    };
    climate: {
      // Turns climate device on.
      turnOn: ServiceFunction<T, object>;
      // Turns climate device off.
      turnOff: ServiceFunction<T, object>;
      // Toggles climate device, from on to off, or off to on.
      toggle: ServiceFunction<T, object>;
      // Sets HVAC operation mode.
      setHvacMode: ServiceFunction<
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
        T,
        {
          // Preset mode. @example away
          preset_mode: string;
        }
      >;
      // Turns auxiliary heater on/off.
      setAuxHeat: ServiceFunction<
        T,
        {
          // New value of auxiliary heater.
          aux_heat: boolean;
        }
      >;
      // Sets target temperature.
      setTemperature: ServiceFunction<
        T,
        {
          // Target temperature.
          temperature?: number;
          // High target temperature.
          target_temp_high?: number;
          // Low target temperature.
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
        T,
        {
          // Target humidity.
          humidity: number;
        }
      >;
      // Sets fan operation mode.
      setFanMode: ServiceFunction<
        T,
        {
          // Fan operation mode. @example low
          fan_mode: string;
        }
      >;
      // Sets swing operation mode.
      setSwingMode: ServiceFunction<
        T,
        {
          // Swing operation mode. @example horizontal
          swing_mode: string;
        }
      >;
    };
    waterHeater: {
      // Turns water heater on.
      turnOn: ServiceFunction<T, object>;
      // Turns water heater off.
      turnOff: ServiceFunction<T, object>;
      // Turns away mode on/off.
      setAwayMode: ServiceFunction<
        T,
        {
          // New value of away mode.
          away_mode: boolean;
        }
      >;
      // Sets the target temperature.
      setTemperature: ServiceFunction<
        T,
        {
          // New target temperature for the water heater.
          temperature: number;
          // New value of the operation mode. For a list of possible modes, refer to the integration documentation. @example eco
          operation_mode?: string;
        }
      >;
      // Sets the operation mode.
      setOperationMode: ServiceFunction<
        T,
        {
          // New value of the operation mode. For a list of possible modes, refer to the integration documentation. @example eco
          operation_mode: string;
        }
      >;
    };
    time: {
      // Sets the time.
      setValue: ServiceFunction<
        T,
        {
          // The time to set. @example 22:15
          time: object;
        }
      >;
    };
    vacuum: {
      // Starts or resumes the cleaning task.
      start: ServiceFunction<T, object>;
      // Pauses the cleaning task.
      pause: ServiceFunction<T, object>;
      // Tells the vacuum cleaner to return to its dock.
      returnToBase: ServiceFunction<T, object>;
      // Tells the vacuum cleaner to do a spot clean-up.
      cleanSpot: ServiceFunction<T, object>;
      // Locates the vacuum cleaner robot.
      locate: ServiceFunction<T, object>;
      // Stops the current cleaning task.
      stop: ServiceFunction<T, object>;
      // Sets the fan speed of the vacuum cleaner.
      setFanSpeed: ServiceFunction<
        T,
        {
          // Fan speed. The value depends on the integration. Some integrations have speed steps, like 'medium'. Some use a percentage, between 0 and 100. @example low
          fan_speed: string;
        }
      >;
      // Sends a command to the vacuum cleaner.
      sendCommand: ServiceFunction<
        T,
        {
          // Command to execute. The commands are integration-specific. @example set_dnd_timer
          command: string;
          // Parameters for the command. The parameters are integration-specific. @example { 'key': 'value' }
          params?: object;
        }
      >;
    };
    hue: {
      // Activates a Hue scene with more control over the options.
      activateScene: ServiceFunction<
        T,
        {
          // Transition duration it takes to bring devices to the state defined in the scene.
          transition?: number;
          // Enable dynamic mode of the scene.
          dynamic?: boolean;
          // Speed of dynamic palette for this scene.
          speed?: number;
          // Set brightness for the scene.
          brightness?: number;
        }
      >;
      // Activates a hue scene stored in the hue hub.
      hueActivateScene: ServiceFunction<
        T,
        {
          // Name of hue group/room from the hue app. @example Living Room
          group_name?: string;
          // Name of hue scene from the hue app. @example Energize
          scene_name?: string;
          // Enable dynamic mode of the scene (V2 bridges and supported scenes only).
          dynamic?: boolean;
        }
      >;
    };
    valve: {
      // Opens a valve.
      openValve: ServiceFunction<T, object>;
      // Closes a valve.
      closeValve: ServiceFunction<T, object>;
      // Moves a valve to a specific position.
      setValvePosition: ServiceFunction<
        T,
        {
          // Target position.
          position: number;
        }
      >;
      // Stops the valve movement.
      stopValve: ServiceFunction<T, object>;
      // Toggles a valve open/closed.
      toggle: ServiceFunction<T, object>;
    };
    sonos: {
      // Takes a snapshot of the media player.
      snapshot: ServiceFunction<
        T,
        {
          // Name of entity that will be snapshot.
          entity_id?: string;
          // True or False. Also snapshot the group layout.
          with_group?: boolean;
        }
      >;
      // Restores a snapshot of the media player.
      restore: ServiceFunction<
        T,
        {
          // Name of entity that will be restored.
          entity_id?: string;
          // True or False. Also restore the group layout.
          with_group?: boolean;
        }
      >;
      // Sets a Sonos timer.
      setSleepTimer: ServiceFunction<
        T,
        {
          // Number of seconds to set the timer.
          sleep_time?: number;
        }
      >;
      // Clears a Sonos timer.
      clearSleepTimer: ServiceFunction<T, object>;
      // Updates an alarm with new time and volume settings.
      updateAlarm: ServiceFunction<
        T,
        {
          // ID for the alarm to be updated.
          alarm_id: number;
          // Set time for the alarm. @example 07:00
          time?: object;
          // Set alarm volume level.
          volume?: number;
          // Enable or disable the alarm.
          enabled?: boolean;
          // Enable or disable including grouped rooms.
          include_linked_zones?: boolean;
        }
      >;
      // Start playing the queue from the first item.
      playQueue: ServiceFunction<
        T,
        {
          // Position of the song in the queue to start playing from.
          queue_position?: number;
        }
      >;
      // Removes an item from the queue.
      removeFromQueue: ServiceFunction<
        T,
        {
          // Position in the queue to remove.
          queue_position?: number;
        }
      >;
    };
    calendar: {
      // Adds a new calendar event.
      createEvent: ServiceFunction<
        T,
        {
          // Defines the short summary or subject for the event. @example Department Party
          summary: string;
          // A more complete description of the event than the one provided by the summary. @example Meeting to provide technical review for 'Phoenix' design.
          description?: string;
          // The date and time the event should start. @example 2022-03-22 20:00:00
          start_date_time?: object;
          // The date and time the event should end. @example 2022-03-22 22:00:00
          end_date_time?: object;
          // The date the all-day event should start. @example 2022-03-22
          start_date?: object;
          // The date the all-day event should end (exclusive). @example 2022-03-23
          end_date?: object;
          // Days or weeks that you want to create the event in. @example {'days': 2} or {'weeks': 2}
          in?: object;
          // The location of the event. @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
      // Lists events on a calendar within a time range.
      listEvents: ServiceFunction<
        T,
        {
          // Returns active events after this time (exclusive). When not set, defaults to now. @example 2022-03-22 20:00:00
          start_date_time?: object;
          // Returns active events before this time (exclusive). Cannot be used with 'duration'. @example 2022-03-22 22:00:00
          end_date_time?: object;
          // Returns active events from start_date_time until the specified duration.
          duration?: object;
        }
      >;
      // Get events on a calendar within a time range.
      getEvents: ServiceFunction<
        T,
        {
          // Returns active events after this time (exclusive). When not set, defaults to now. @example 2022-03-22 20:00:00
          start_date_time?: object;
          // Returns active events before this time (exclusive). Cannot be used with 'duration'. @example 2022-03-22 22:00:00
          end_date_time?: object;
          // Returns active events from start_date_time until the specified duration.
          duration?: object;
        }
      >;
    };
    google: {
      // Adds a new calendar event.
      addEvent: ServiceFunction<
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
      // Add a new calendar event.
      createEvent: ServiceFunction<
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
    googleAssistantSdk: {
      // Sends a command as a text query to Google Assistant.
      sendTextCommand: ServiceFunction<
        T,
        {
          // Command(s) to send to Google Assistant. @example turn off kitchen TV
          command?: string;
          // Name(s) of media player entities to play response on. @example media_player.living_room_speaker
          media_player?: string;
        }
      >;
    };
    automation: {
      // Triggers the actions of an automation.
      trigger: ServiceFunction<
        T,
        {
          // Defines whether or not the conditions will be skipped.
          skip_condition?: boolean;
        }
      >;
      // Toggles (enable / disable) an automation.
      toggle: ServiceFunction<T, object>;
      // Enables an automation.
      turnOn: ServiceFunction<T, object>;
      // Disables an automation.
      turnOff: ServiceFunction<
        T,
        {
          // Stops currently running actions.
          stop_actions?: boolean;
        }
      >;
      // Reloads the automation configuration.
      reload: ServiceFunction<T, object>;
    };
    uiLovelaceMinimalist: {
      // Reload dashboard configuration for UI Lovelace Minimalist.
      reload: ServiceFunction<T, object>;
    };
    zha: {
      // Allows nodes to join the Zigbee network.
      permit: ServiceFunction<
        T,
        {
          // Time to permit joins.
          duration?: number;
          // IEEE address of the node permitting new joins. @example 00:0d:6f:00:05:7d:2d:34
          ieee?: string;
          // IEEE address of the joining device (must be used with the install code). @example 00:0a:bf:00:01:10:23:35
          source_ieee?: string;
          // Install code of the joining device (must be used with the source_ieee). @example 1234-5678-1234-5678-AABB-CCDD-AABB-CCDD-EEFF
          install_code?: string;
          // Value of the QR install code (different between vendors). @example Z:000D6FFFFED4163B$I:52797BF4A5084DAA8E1712B61741CA024051
          qr_code?: string;
        }
      >;
      // Removes a node from the Zigbee network.
      remove: ServiceFunction<
        T,
        {
          // IEEE address of the node to remove. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
        }
      >;
      // Sets an attribute value for the specified cluster on the specified entity.
      setZigbeeClusterAttribute: ServiceFunction<
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // Endpoint ID for the cluster.
          endpoint_id: number;
          // ZCL cluster to retrieve attributes for.
          cluster_id: number;
          // Type of the cluster.
          cluster_type?: "in" | "out";
          // ID of the attribute to set.
          attribute: number;
          // Value to write to the attribute. @example 1
          value: string;
          // Manufacturer code. Use a value of '-1' to force no code to be set. @example 252
          manufacturer?: string;
        }
      >;
      // Issues a command on the specified cluster on the specified entity.
      issueZigbeeClusterCommand: ServiceFunction<
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // Endpoint ID for the cluster.
          endpoint_id: number;
          // ZCL cluster to retrieve attributes for.
          cluster_id: number;
          // Type of the cluster.
          cluster_type?: "in" | "out";
          // ID of the command to execute.
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
      // Issue command on the specified cluster on the specified group.
      issueZigbeeGroupCommand: ServiceFunction<
        T,
        {
          // Hexadecimal address of the group. @example 546
          group: string;
          // ZCL cluster to send command to.
          cluster_id: number;
          // Type of the cluster.
          cluster_type?: "in" | "out";
          // ID of the command to execute.
          command: number;
          // Arguments to pass to the command. @example [arg1, arg2, argN]
          args?: object;
          // Manufacturer code. Use a value of '-1' to force no code to be set. @example 252
          manufacturer?: string;
        }
      >;
      // This service uses the WD capabilities to emit a quick audible/visible pulse called a 'squawk'. The squawk command has no effect if the WD is currently active (warning in progress).
      warningDeviceSquawk: ServiceFunction<
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // The Squawk Mode field is used as a 4-bit enumeration, and can have one of the values shown in Table 8-24 of the ZCL spec - Squawk Mode Field. The exact operation of each mode (how the WD “squawks”) is implementation specific.
          mode?: number;
          // The strobe field is used as a Boolean, and determines if the visual indication is also required in addition to the audible squawk, as shown in Table 8-25 of the ZCL spec - Strobe Bit.
          strobe?: number;
          // The squawk level field is used as a 2-bit enumeration, and determines the intensity of audible squawk sound as shown in Table 8-26 of the ZCL spec - Squawk Level Field Values.
          level?: number;
        }
      >;
      // This service starts the operation of the warning device. The warning device alerts the surrounding area by audible (siren) and visual (strobe) signals.
      warningDeviceWarn: ServiceFunction<
        T,
        {
          // IEEE address for the device. @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          // The Warning Mode field is used as a 4-bit enumeration, can have one of the values 0-6 defined below in table 8-20 of the ZCL spec. The exact behavior of the warning device in each mode is according to the relevant security standards.
          mode?: number;
          // The Strobe field is used as a 2-bit enumeration, and determines if the visual indication is required in addition to the audible siren, as indicated in Table 8-21 of the ZCL spec. '0' means no strobe, '1' means strobe. If the strobe field is “1” and the Warning Mode is “0” (“Stop”), then only the strobe is activated.
          strobe?: number;
          // The Siren Level field is used as a 2-bit enumeration, and indicates the intensity of audible squawk sound as shown in Table 8-22 of the ZCL spec.
          level?: number;
          // Requested duration of warning, in seconds (16 bit). If both Strobe and Warning Mode are '0' this field is ignored.
          duration?: number;
          // Indicates the length of the flash cycle. This allows you to vary the flash duration for different alarm types (e.g., fire, police, burglar). The valid range is 0-100 in increments of 10. All other values must be rounded to the nearest valid value. Strobe calculates a duty cycle over a duration of one second. The ON state must precede the OFF state. For example, if the Strobe Duty Cycle field specifies “40,”, then the strobe flashes ON for 4/10ths of a second and then turns OFF for 6/10ths of a second.
          duty_cycle?: number;
          // Indicates the intensity of the strobe as shown in Table 8-23 of the ZCL spec. This attribute is designed to vary the output of the strobe (i.e., brightness) and not its frequency, which is detailed in section 8.4.2.3.1.6 of the ZCL spec.
          intensity?: number;
        }
      >;
      // Sets a user code on a lock.
      setLockUserCode: ServiceFunction<
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
        T,
        {
          // Code slot to enable. @example 1
          code_slot: string;
        }
      >;
      // Disables a user code on a lock.
      disableLockUserCode: ServiceFunction<
        T,
        {
          // Code slot to disable. @example 1
          code_slot: string;
        }
      >;
      // Clears a user code from a lock.
      clearLockUserCode: ServiceFunction<
        T,
        {
          // Code slot to clear code from. @example 1
          code_slot: string;
        }
      >;
    };
    alarmControlPanel: {
      // Disarms the alarm.
      alarmDisarm: ServiceFunction<
        T,
        {
          // Code to disarm the alarm. @example 1234
          code?: string;
        }
      >;
      // Sets the alarm to: _armed, but someone is home_.
      alarmArmHome: ServiceFunction<
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Sets the alarm to: _armed, no one home_.
      alarmArmAway: ServiceFunction<
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Sets the alarm to: _armed for the night_.
      alarmArmNight: ServiceFunction<
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Sets the alarm to: _armed for vacation_.
      alarmArmVacation: ServiceFunction<
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Arms the alarm while allowing to bypass a custom area.
      alarmArmCustomBypass: ServiceFunction<
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
      // Enables an external alarm trigger.
      alarmTrigger: ServiceFunction<
        T,
        {
          // Code to arm the alarm. @example 1234
          code?: string;
        }
      >;
    };
    lock: {
      // Unlocks a lock.
      unlock: ServiceFunction<
        T,
        {
          // Code used to unlock the lock. @example 1234
          code?: string;
        }
      >;
      // Locks a lock.
      lock: ServiceFunction<
        T,
        {
          // Code used to lock the lock. @example 1234
          code?: string;
        }
      >;
      // Opens a lock.
      open: ServiceFunction<
        T,
        {
          // Code used to open the lock. @example 1234
          code?: string;
        }
      >;
    };
    siren: {
      // Turns the siren on.
      turnOn: ServiceFunction<
        T,
        {
          // The tone to emit. When `available_tones` property is a map, either the key or the value can be used. Must be supported by the integration. @example fire
          tone?: string;
          // The volume. 0 is inaudible, 1 is the maximum volume. Must be supported by the integration. @example 0.5
          volume_level?: number;
          // Number of seconds the sound is played. Must be supported by the integration. @example 15
          duration?: string;
        }
      >;
      // Turns the siren off.
      turnOff: ServiceFunction<T, object>;
      // Toggles the siren on/off.
      toggle: ServiceFunction<T, object>;
    };
    eufySecurity: {
      // Pull latest data from cloud and update internal state
      forceSync: ServiceFunction<T, object>;
      // Send a JSON message to Web Socket
      sendMessage: ServiceFunction<
        T,
        {
          // Raw message in JSON format
          message: string;
        }
      >;
      // Set Log Level of Add-on, this is needed to debug issues happening in eufy-security-ws add-on. Before calling a problematic command, set the log level (preferable to debug), execute your command and revert it back to info.
      setLogLevel: ServiceFunction<
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
        T,
        {
          // Duration in seconds @example 10
          duration: number;
        }
      >;
      // Reset Alarm for Alarm Panel
      resetAlarm: ServiceFunction<T, object>;
      // Arm Customer 1 for Alarm Panel
      alarmArmCustom1: ServiceFunction<T, object>;
      // Arm Customer 2 for Alarm Panel
      alarmArmCustom2: ServiceFunction<T, object>;
      // Arm Customer 3 for Alarm Panel
      alarmArmCustom3: ServiceFunction<T, object>;
      // Switch to geofence mode
      geofence: ServiceFunction<T, object>;
      // Switch to schedule mode
      schedule: ServiceFunction<T, object>;
      // Only supported if no doorbell device is registered at the station where the chime is to be performed
      chime: ServiceFunction<
        T,
        {
          // Ringtone ID? @example 419
          ringtone: number;
        }
      >;
      // Reboot station
      reboot: ServiceFunction<T, object>;
      // Turn Alarm off for Alarm Panel
      alarmOff: ServiceFunction<T, object>;
      // Generate Image for Camera
      generateImage: ServiceFunction<T, object>;
      // Send start live stream command to camera
      startP2PLivestream: ServiceFunction<T, object>;
      // Send stop live stream command to camera
      stopP2PLivestream: ServiceFunction<T, object>;
      // Send start live stream command to camera
      startRtspLivestream: ServiceFunction<T, object>;
      // Send stop live stream command to camera
      stopRtspLivestream: ServiceFunction<T, object>;
      // Call PTZ command for supported PTZ cameras
      ptz: ServiceFunction<
        T,
        {
          // Direction Option
          direction: "ROTATE360" | "DOWN" | "UP" | "RIGHT" | "LEFT";
        }
      >;
      // Look up for supported PTZ cameras
      ptzUp: ServiceFunction<T, object>;
      // Look down for supported PTZ cameras
      ptzDown: ServiceFunction<T, object>;
      // Look left for supported PTZ cameras
      ptzLeft: ServiceFunction<T, object>;
      // Look right for supported PTZ cameras
      ptzRight: ServiceFunction<T, object>;
      // Rotate 360 degrees for supported PTZ cameras
      ptz360: ServiceFunction<T, object>;
      // Calibrate supported cameras
      calibrate: ServiceFunction<T, object>;
      // Trigger Alarm for a Duration
      triggerCameraAlarmWithDuration: ServiceFunction<
        T,
        {
          // Duration in seconds @example 10
          duration: number;
        }
      >;
      // Send quick response, this works ONLY when camera is streaming via P2P (not RTSP)
      quickResponse: ServiceFunction<
        T,
        {
          // Voice ID stored in attributes @example 419
          voice_id: number;
        }
      >;
      // Snooze Alarm for a Duration
      snooze: ServiceFunction<
        T,
        {
          // Snooze Duration in seconds @example 10
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
  }
  export interface CustomEntityNameContainer {
    names:
      | "person.rens"
      | "person.claire"
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
      | "update.emulated_hue_update"
      | "update.home_assistant_operating_system_update"
      | "binary_sensor.humidity_rising"
      | "scene.ventilation_off"
      | "scene.ventilation_setting_1"
      | "scene.ventilation_setting_2"
      | "scene.ventilation_speed_3"
      | "group.household_people"
      | "group.downstairs_lights"
      | "group.office_lights"
      | "group.bedroom_lights"
      | "group.garden_lights"
      | "input_boolean.minimalist_welcome_toggle"
      | "zone.work_claire"
      | "zone.ordina"
      | "zone.parents_rens"
      | "zone.parents_claire"
      | "zone.vgz"
      | "input_select.wled_live_override"
      | "light.bedroom_group"
      | "light.office_group"
      | "light.garden_group"
      | "light.kitchen_table_group"
      | "light.living_room_group"
      | "light.kitchen_spots"
      | "light.kitchen_group"
      | "light.living_room_spots"
      | "light.attic_group"
      | "zone.home"
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
      | "fan.mechanical_ventilation"
      | "cover.garage_door_cover"
      | "sensor.plex_recently_added"
      | "sun.sun"
      | "sensor.sun_next_dawn"
      | "sensor.sun_next_dusk"
      | "sensor.sun_next_midnight"
      | "sensor.sun_next_noon"
      | "sensor.sun_next_rising"
      | "sensor.sun_next_setting"
      | "script.1638709314016"
      | "script.cast_camera_to_driveway_monitor"
      | "script.turn_off_all_lights"
      | "script.ventilation_on_full_speed"
      | "script.turn_ventilation_off"
      | "script.good_morning"
      | "script.toggle_ventilation"
      | "script.timed_bedroom_fan"
      | "script.show_ha_settings_on_tablet"
      | "binary_sensor.morning"
      | "binary_sensor.evening"
      | "binary_sensor.night"
      | "binary_sensor.afternoon"
      | "camera.buienradar"
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
      | "weather.buienradar"
      | "device_tracker.oneplus_7t_pro"
      | "device_tracker.claire_s_telefoon"
      | "device_tracker.rens_iphone"
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
      | "sensor.cpu_temperature"
      | "media_player.chromecast"
      | "remote.chromecast"
      | "sensor.neerslag_buienalarm_regen_data"
      | "sensor.neerslag_buienradar_regen_data"
      | "sensor.hacs"
      | "binary_sensor.ib0819992320_connection_state"
      | "binary_sensor.ru1795430400_battery"
      | "binary_sensor.ru1795430400_connection_state"
      | "binary_sensor.tado_power"
      | "binary_sensor.tado_connectivity"
      | "binary_sensor.tado_overlay"
      | "binary_sensor.tado_window"
      | "binary_sensor.tado_early_start"
      | "binary_sensor.warm_water_power"
      | "binary_sensor.warm_water_connectivity"
      | "binary_sensor.warm_water_overlay"
      | "device_tracker.claire_s_telefoon_2"
      | "device_tracker.rens_iphone_2"
      | "sensor.thuis_outdoor_temperature"
      | "sensor.thuis_solar_percentage"
      | "sensor.thuis_weather_condition"
      | "sensor.thuis_tado_mode"
      | "sensor.thuis_geofencing_mode"
      | "sensor.thuis_automatic_geofencing"
      | "sensor.tado_temperature"
      | "sensor.tado_humidity"
      | "sensor.tado_tado_mode"
      | "sensor.tado_heating"
      | "sensor.warm_water_tado_mode"
      | "climate.tado"
      | "water_heater.warm_water"
      | "weather.huis"
      | "binary_sensor.roborock_s8_mop_attached"
      | "binary_sensor.roborock_s8_water_box_attached"
      | "binary_sensor.roborock_s8_water_shortage"
      | "binary_sensor.roborock_s8_cleaning"
      | "select.roborock_s8_mop_intensity"
      | "select.roborock_s8_mop_mode"
      | "sensor.roborock_s8_main_brush_time_left"
      | "sensor.roborock_s8_side_brush_time_left"
      | "sensor.roborock_s8_filter_time_left"
      | "sensor.roborock_s8_sensor_time_left"
      | "sensor.roborock_s8_cleaning_time"
      | "sensor.roborock_s8_total_cleaning_time"
      | "sensor.roborock_s8_status"
      | "sensor.roborock_s8_cleaning_area"
      | "sensor.roborock_s8_total_cleaning_area"
      | "sensor.roborock_s8_vacuum_error"
      | "sensor.roborock_s8_battery"
      | "sensor.roborock_s8_last_clean_begin"
      | "sensor.roborock_s8_last_clean_end"
      | "sensor.roborock_s8_cleaning_progress"
      | "vacuum.roborock_s8"
      | "number.roborock_s8_volume"
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
      | "light.hue_milliskin_spot_3"
      | "light.hue_filament_bulb_3"
      | "light.hue_ambiance_spot_6"
      | "light.hue_ambiance_spot_1"
      | "light.on_off_plug_1"
      | "light.hue_ambiance_spot_4"
      | "light.hue_milliskin_spot_2"
      | "light.hue_ambiance_spot_2"
      | "light.vloerlamp"
      | "light.lightstrip_bureau"
      | "light.hue_ambiance_spot_5"
      | "light.kleedkamer"
      | "light.hue_ambiance_spot_3"
      | "light.slaapkamer_plafondlamp"
      | "light.nachtkastje_claire"
      | "light.hue_sana"
      | "light.buitenverlichting_tuin"
      | "light.hue_filament_bulb_2"
      | "light.kantoor"
      | "light.garagedeur"
      | "light.hue_play_1"
      | "light.hue_filament_bulb_1"
      | "light.hue_milliskin_spot_1"
      | "light.nachtkastje_rens"
      | "light.hue_impress_outdoor_wall_1"
      | "light.hue_color_lamp_1"
      | "light.hue_play_2"
      | "light.tuin"
      | "scene.kleedkamer_savanne_zonsondergang"
      | "scene.benedenverdieping_tropische_schemering"
      | "scene.keuken_nachtlampje"
      | "scene.kantoor_savanne_zonsondergang"
      | "scene.bovenverdieping_savanne_zonsondergang"
      | "scene.benedenverdieping_nachtlampje"
      | "scene.slaapkamer_lentebloesem"
      | "scene.kantoor_concentreren"
      | "scene.spotjes_tropische_schemering"
      | "scene.keuken_gedimd"
      | "scene.spotjes_lentebloesem"
      | "scene.woonkamer_romantisch"
      | "scene.slaapkamer_nachtlampje"
      | "scene.bovenverdieping_lentebloesem"
      | "scene.kleedkamer_concentreren"
      | "scene.hal_concentreren"
      | "scene.slaapkamer_lezen"
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
      | "scene.kantoor_work_daytime"
      | "scene.hal_hal_scene"
      | "scene.woonkamer_nightlight"
      | "scene.slaapkamer_energie"
      | "scene.slaapkamer_gedimd"
      | "scene.kleedkamer_energie"
      | "scene.hal_hal_gedimd"
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
      | "scene.kantoor_work_nighttime"
      | "scene.bovenverdieping_gedimd"
      | "scene.kantoor_lezen"
      | "scene.zolder_tokio"
      | "scene.hal_ontspannen"
      | "scene.bovenverdieping_ontspannen"
      | "scene.slaapkamer_helder"
      | "scene.woonkamer_avond"
      | "scene.bovenverdieping_helder"
      | "scene.kantoor_work"
      | "scene.spotjes_ontspannen"
      | "scene.woonkamer_concentrate"
      | "scene.woonkamer_movie_scene"
      | "scene.woonkamer_night"
      | "scene.hal_nachtlampje"
      | "scene.tuin_helder"
      | "scene.spotjes_nachtlampje"
      | "scene.tuin_gedimd"
      | "scene.kantoor_energie"
      | "scene.kleedkamer_lentebloesem"
      | "scene.benedenverdieping_concentreren"
      | "scene.benedenverdieping_energie"
      | "scene.tuin_nachtlampje"
      | "scene.spotjes_savanne_zonsondergang"
      | "scene.slaapkamer_arctische_dageraad"
      | "scene.slaapkamer_savanne_zonsondergang"
      | "scene.woonkamer_de_rens_scene"
      | "scene.slaapkamer_avond"
      | "scene.zolder_energie"
      | "scene.woonkamer_soho"
      | "scene.slaapkamer_tropische_schemering"
      | "scene.bovenverdieping_lezen"
      | "scene.spotjes_energie"
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
      | "scene.benedenverdieping_lezen"
      | "scene.zolder_concentreren"
      | "scene.bovenverdieping_arctische_dageraad"
      | "scene.spotjes_concentreren"
      | "scene.keuken_helder"
      | "scene.slaapkamer_ontspannen"
      | "scene.kantoor_arctische_dageraad"
      | "scene.woonkamer_energize"
      | "scene.kantoor_lentebloesem"
      | "scene.zolder_ontspannen"
      | "scene.benedenverdieping_gedimd"
      | "scene.hal_savanne_zonsondergang"
      | "scene.slaapkamer_concentreren"
      | "scene.woonkamer_natural_light"
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
      | "switch.automation_niet_thuis"
      | "switch.automation_licht_aan"
      | "switch.automation_state_after_streaming"
      | "switch.automation_kleedkamer_dimmer"
      | "switch.automation_mimic_presence"
      | "switch.automation_avond_kleedkamer"
      | "switch.automation_slaapkamer_dimmer"
      | "switch.automation_hue_motion_sensor_hal"
      | "switch.automation_leaving_home"
      | "switch.automation_tuin_aan"
      | "button.shelly_plus_1_reboot"
      | "event.shellyplus1_a8032ab8a210_input_0"
      | "switch.garage_door"
      | "update.shelly_plus_1_firmware_update"
      | "binary_sensor.zonnescherm_overheating"
      | "button.zonnescherm_reboot"
      | "cover.zonnescherm"
      | "sensor.zonnescherm_power"
      | "sensor.zonnescherm_energy"
      | "media_player.lg_c8"
      | "sensor.sonarr_upcoming"
      | "switch.roborock_s8_child_lock"
      | "switch.roborock_s8_do_not_disturb"
      | "time.roborock_s8_do_not_disturb_begin"
      | "time.roborock_s8_do_not_disturb_end"
      | "button.synchronize_devices"
      | "binary_sensor.rpi_power_status"
      | "light.woonkamer"
      | "light.kantoor_2"
      | "light.keuken"
      | "media_player.nest_wifi_kantoor"
      | "sensor.energy_production_today"
      | "sensor.energy_production_today_remaining"
      | "sensor.energy_production_tomorrow"
      | "sensor.power_highest_peak_time_today"
      | "sensor.power_highest_peak_time_tomorrow"
      | "sensor.power_production_now"
      | "sensor.energy_current_hour"
      | "sensor.energy_next_hour"
      | "binary_sensor.radarr_health"
      | "calendar.radarr"
      | "sensor.radarr_disk_space_movies"
      | "binary_sensor.xiaomi_pad_5_kiosk_mode"
      | "binary_sensor.xiaomi_pad_5_plugged_in"
      | "binary_sensor.xiaomi_pad_5_device_admin"
      | "button.xiaomi_pad_5_restart_browser"
      | "button.xiaomi_pad_5_reboot_device"
      | "button.xiaomi_pad_5_bring_to_foreground"
      | "button.xiaomi_pad_5_send_to_background"
      | "button.xiaomi_pad_5_load_start_url"
      | "media_player.xiaomi_pad_5"
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
      | "media_player.tv"
      | "media_player.google_home_mini"
      | "media_player.nest_hub"
      | "sensor.zonneplan_yield_total"
      | "sensor.zonneplan_last_measured_value"
      | "sensor.zonneplan_last_measured"
      | "sensor.zonneplan_yield_today"
      | "sensor.woonkamer_audio_input_format"
      | "binary_sensor.woonkamer_microphone"
      | "media_player.woonkamer"
      | "calendar.rensknoors_gmail_com"
      | "calendar.clairebongers_gmail_com"
      | "calendar.feestdagen_in_nederland"
      | "calendar.persoonlijk_rens"
      | "calendar.gezin"
      | "calendar.verjaardagen"
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
      | "light.benedenverdieping"
      | "light.kleedkamer_2"
      | "light.slaapkamer"
      | "light.hal"
      | "light.spotjes_keuken"
      | "light.bovenverdieping"
      | "light.spotjes"
      | "light.zolder"
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
      | "automation.room_occupancy"
      | "automation.new_automation"
      | "automation.new_automation_2"
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
      | "image.roborock_s8_onderverdieping"
      | "image.roborock_s8_bovenverdieping"
      | "image.roborock_s8"
      | "image.roborock_s8_zolder"
      | "binary_sensor.toilet_occupancy"
      | "binary_sensor.toilet_motion"
      | "binary_sensor.door_garden_livingroom_on_off"
      | "binary_sensor.lumi_lumi_sensor_magnet_aq2_on_off"
      | "binary_sensor.door_sensor_garage_door_opening"
      | "button.sonoff_temperature_garage_identify"
      | "button.garage_door_ce78080a_identify"
      | "button.sonoff_temperature_bedroom_identify"
      | "button.sonoff_temperature_bathroom_identify"
      | "button.smartplug_wallpanel_identify"
      | "button.texasinstruments_ti_router_identify"
      | "button.smartplug_hal_bovenverdieping_fab5090a_identify"
      | "button.sonoff_temperature_attic_identify"
      | "button.ventilation_identify"
      | "button.lumi_lumi_sensor_motion_aq2_59e17007_identify"
      | "button.door_garden_livingroom_identify"
      | "button.lumi_lumi_sensor_magnet_aq2_identify"
      | "button.smartplug_christmas_tree_identify"
      | "button.smartplug_washing_machine_identify"
      | "button.texasinstruments_ti_router_identify_2"
      | "button.zigbee_router_office_identify"
      | "button.door_sensor_garage_door_identify"
      | "cover.front_window_cover_cover"
      | "light.ventilation_on_off"
      | "number.ventilation_level_start_up_current_level"
      | "select.ventilation_on_off_startuponoff"
      | "select.smartplug_christmas_tree_power_on_state"
      | "select.smartplug_christmas_tree_backlight_mode"
      | "select.smartplug_washing_machine_power_on_state"
      | "select.smartplug_washing_machine_backlight_mode"
      | "sensor.sonoff_temperature_garage_power"
      | "sensor.garage_temperature"
      | "sensor.garage_humidity"
      | "sensor.sonoff_temperature_bedroom_power"
      | "sensor.bedroom_temperature"
      | "sensor.bedroom_humidity"
      | "sensor.sonoff_temperature_bathroom_power"
      | "sensor.bathroom_temperature"
      | "sensor.bathroom_humidity"
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
      | "sensor.smartplug_christmas_tree_rms_current"
      | "sensor.smartplug_christmas_tree_rms_voltage"
      | "sensor.smartplug_christmas_tree_active_power"
      | "sensor.smartplug_christmas_tree_summation_delivered"
      | "sensor.smartplug_washing_machine_rms_current"
      | "sensor.smartplug_washing_machine_rms_voltage"
      | "sensor.smartplug_washing_machine_power_factor"
      | "sensor.smartplug_washing_machine_active_power"
      | "sensor.smartplug_washing_machine_summation_delivered"
      | "sensor.door_sensor_garage_door_battery"
      | "switch.garage_door_plug"
      | "switch.smartplug_wallpanel"
      | "switch.smartplug_hal_bovenverdieping"
      | "switch.smartplug_christmas_tree_switch"
      | "switch.smartplug_christmas_tree_child_lock"
      | "switch.smartplug_washing_machine_switch"
      | "switch.smartplug_washing_machine_child_lock"
      | "update.garage_door_firmware"
      | "update.smartplug_wallpanel_firmware"
      | "update.smartplug_hal_bovenverdieping_firmware"
      | "update.toilet_motion_firmware"
      | "update.smartplug_christmas_tree_firmware"
      | "update.smartplug_washing_machine_firmware"
      | "update.zigbee_router_office_firmware"
      | "update.front_window_cover_firmware"
      | "binary_sensor.voordeur_motion_detected"
      | "binary_sensor.voordeur_person_detected"
      | "binary_sensor.voordeur_snooze"
      | "binary_sensor.garage_motion_detected"
      | "binary_sensor.garage_person_detected"
      | "binary_sensor.garage_snooze"
      | "binary_sensor.homebase_alarm"
      | "binary_sensor.voordeur_debug_device"
      | "binary_sensor.garage_debug_device"
      | "binary_sensor.homebase_debug_station"
      | "select.voordeur_nightvision"
      | "select.voordeur_motion_detection_type"
      | "select.voordeur_speaker_volume"
      | "select.voordeur_power_source"
      | "select.voordeur_power_working_mode"
      | "select.garage_nightvision"
      | "select.garage_motion_detection_type"
      | "select.garage_speaker_volume"
      | "select.garage_power_source"
      | "select.garage_power_working_mode"
      | "select.homebase_guard_mode"
      | "sensor.voordeur_battery_percentage"
      | "sensor.voordeur_battery_temperature"
      | "sensor.voordeur_days_since_last_charging"
      | "sensor.voordeur_wifi_rssi"
      | "sensor.voordeur_wifi_signal_level"
      | "sensor.voordeur_person_name"
      | "sensor.voordeur_rtsp_stream_url"
      | "sensor.voordeur_charging_status"
      | "sensor.voordeur_snooze_time"
      | "sensor.voordeur_snooze_start_time"
      | "sensor.garage_battery_percentage"
      | "sensor.garage_battery_temperature"
      | "sensor.garage_days_since_last_charging"
      | "sensor.garage_wifi_rssi"
      | "sensor.garage_wifi_signal_level"
      | "sensor.garage_person_name"
      | "sensor.garage_rtsp_stream_url"
      | "sensor.garage_charging_status"
      | "sensor.garage_snooze_time"
      | "sensor.garage_snooze_start_time"
      | "sensor.homebase_current_mode"
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
      | "switch.voordeur_rtsp_stream"
      | "switch.voordeur_light"
      | "switch.voordeur_microphone"
      | "switch.voordeur_speaker"
      | "switch.voordeur_audio_recording"
      | "switch.garage_camera_enabled"
      | "switch.garage_antitheft_detection"
      | "switch.garage_status_led"
      | "switch.garage_motion_detection"
      | "switch.garage_rtsp_stream"
      | "switch.garage_light"
      | "switch.garage_microphone"
      | "switch.garage_speaker"
      | "switch.garage_audio_recording"
      | "alarm_control_panel.homebase"
      | "number.voordeur_motion_detection_sensitivity"
      | "number.voordeur_light_brightness_manual"
      | "number.garage_motion_detection_sensitivity"
      | "number.garage_light_brightness_manual"
      | "number.homebase_prompt_volume"
      | "number.homebase_alarm_volume"
      | "number.homebase_alarm_arm_delay"
      | "number.homebase_alarm_delay"
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
      | "button.garage_start_rtsp_stream"
      | "button.garage_stop_rtsp_stream"
      | "button.garage_trigger_alarm"
      | "button.garage_reset_alarm"
      | "button.homebase_trigger_alarm"
      | "button.homebase_reset_alarm"
      | "button.homebase_reboot"
      | "image.voordeur_event_image"
      | "image.garage_event_image"
      | "binary_sensor.updater"
      | "media_player.android_tv"
      | "sensor.zonneplan_current_usage"
      | "sensor.zonneplan_sustainability_score"
      | "sensor.zonneplan_status_tip"
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
      | "sensor.wallpanel_browser_path"
      | "sensor.wallpanel_browser_visibility"
      | "sensor.wallpanel_browser_useragent"
      | "sensor.wallpanel_browser_user"
      | "binary_sensor.wallpanel_browser_fullykiosk"
      | "sensor.wallpanel_browser_width"
      | "sensor.wallpanel_browser_height"
      | "binary_sensor.wallpanel_browser_dark_mode"
      | "binary_sensor.wallpanel"
      | "light.wallpanel_screen"
      | "sensor.wallpanel_browser_battery"
      | "binary_sensor.wallpanel_browser_charging"
      | "sensor.voordeur_video_codec"
      | "sensor.garage_video_codec"
      | "sensor.smartplug_christmas_tree_power_factor"
      | "switch.automation_avond"
      | "sensor.front_window_cover_window_covering_type"
      | "media_player.wallpanel"
      | "binary_sensor.backups_stale"
      | "sensor.backup_state";
  }
}
