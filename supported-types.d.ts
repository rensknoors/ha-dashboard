// this is an auto generated file, do not change this manually

import { ServiceFunction, ServiceFunctionTypes } from "@hakit/core";
declare module "@hakit/core" {
  export interface CustomSupportedServices<
    T extends ServiceFunctionTypes = "target",
  > {
    homeassistant: {
      // undefined
      savePersistentStates: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      stop: ServiceFunction<object, T, object>;
      // undefined
      restart: ServiceFunction<object, T, object>;
      // undefined
      checkConfig: ServiceFunction<object, T, object>;
      // undefined
      updateEntity: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
        }
      >;
      // undefined
      reloadCoreConfig: ServiceFunction<object, T, object>;
      // undefined
      setLocation: ServiceFunction<
        object,
        T,
        {
          //  @example 32.87336 @constraints  number: mode: box, min: -90, max: 90, step: any
          latitude: number;
          //  @example 117.22743 @constraints  number: mode: box, min: -180, max: 180, step: any
          longitude: number;
          //  @example 120 @constraints  number: mode: box, step: any
          elevation?: number;
        }
      >;
      // undefined
      reloadCustomTemplates: ServiceFunction<object, T, object>;
      // undefined
      reloadConfigEntry: ServiceFunction<
        object,
        T,
        {
          //  @example 8955375327824e14ba89e4b29cc3ec9a @constraints  config_entry:
          entry_id?: any;
        }
      >;
      // undefined
      reloadAll: ServiceFunction<object, T, object>;
    };
    persistentNotification: {
      // undefined
      create: ServiceFunction<
        object,
        T,
        {
          //  @example Please check your configuration.yaml.
          message: string;
          //  @example Test notification
          title?: string;
          //  @example 1234
          notification_id?: string;
        }
      >;
      // undefined
      dismiss: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          notification_id: string;
        }
      >;
      // undefined
      dismissAll: ServiceFunction<object, T, object>;
    };
    systemLog: {
      // undefined
      clear: ServiceFunction<object, T, object>;
      // undefined
      write: ServiceFunction<
        object,
        T,
        {
          //  @example Something went wrong
          message: string;
          //
          level?: "debug" | "info" | "warning" | "error" | "critical";
          //  @example mycomponent.myplatform
          logger?: string;
        }
      >;
    };
    logger: {
      // undefined
      setDefaultLevel: ServiceFunction<
        object,
        T,
        {
          //
          level?: "debug" | "info" | "warning" | "error" | "fatal" | "critical";
        }
      >;
      // undefined
      setLevel: ServiceFunction<object, T, object>;
    };
    frontend: {
      // undefined
      setTheme: ServiceFunction<
        object,
        T,
        {
          //  @example default
          name: string;
          //
          mode?: "dark" | "light";
        }
      >;
      // undefined
      reloadThemes: ServiceFunction<object, T, object>;
    };
    recorder: {
      // undefined
      purge: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 365, unit_of_measurement: days, step: 1, mode: slider
          keep_days?: number;
          //  @constraints  boolean:
          repack?: boolean;
          //  @constraints  boolean:
          apply_filter?: boolean;
        }
      >;
      // undefined
      purgeEntities: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @example sun @constraints  object: multiple: false
          domains?: object;
          //  @example domain*.object_id* @constraints  object: multiple: false
          entity_globs?: object;
          //  @constraints  number: min: 0, max: 365, unit_of_measurement: days, step: 1, mode: slider
          keep_days?: number;
        }
      >;
      // undefined
      enable: ServiceFunction<object, T, object>;
      // undefined
      disable: ServiceFunction<object, T, object>;
      // undefined
      getStatistics: ServiceFunction<
        object,
        T,
        {
          //  @example 2025-01-01 00:00:00 @constraints  datetime:
          start_time: string;
          //  @example 2025-01-02 00:00:00 @constraints  datetime:
          end_time?: string;
          //  @example sensor.energy_consumption,sensor.temperature @constraints  statistic: multiple: true
          statistic_ids: any;
          //  @example hour
          period: "5minute" | "hour" | "day" | "week" | "month";
          //  @example mean,sum
          types:
            | "change"
            | "last_reset"
            | "max"
            | "mean"
            | "min"
            | "state"
            | "sum";
          //  @example [object Object] @constraints  object: multiple: false
          units?: object;
        }
      >;
    };
    hassio: {
      // undefined
      addonStart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonStop: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonRestart: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      addonStdin: ServiceFunction<
        object,
        T,
        {
          //  @example core_ssh @constraints  addon:
          addon: string;
        }
      >;
      // undefined
      hostShutdown: ServiceFunction<object, T, object>;
      // undefined
      hostReboot: ServiceFunction<object, T, object>;
      // undefined
      backupFull: ServiceFunction<
        object,
        T,
        {
          //  @example Backup 1
          name?: string;
          //  @example password
          password?: string;
          //  @constraints  boolean:
          compressed?: boolean;
          //  @example my_backup_mount @constraints  backup_location:
          location?: string;
          //  @constraints  boolean:
          homeassistant_exclude_database?: boolean;
        }
      >;
      // undefined
      backupPartial: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          homeassistant?: boolean;
          //  @constraints  boolean:
          homeassistant_exclude_database?: boolean;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          addons?: object;
          //  @example homeassistant,share @constraints  object: multiple: false
          folders?: object;
          //  @example Partial backup 1
          name?: string;
          //  @example password
          password?: string;
          //  @constraints  boolean:
          compressed?: boolean;
          //  @example my_backup_mount @constraints  backup_location:
          location?: string;
        }
      >;
      // undefined
      restoreFull: ServiceFunction<
        object,
        T,
        {
          //
          slug: string;
          //  @example password
          password?: string;
        }
      >;
      // undefined
      restorePartial: ServiceFunction<
        object,
        T,
        {
          //
          slug: string;
          //  @constraints  boolean:
          homeassistant?: boolean;
          //  @example homeassistant,share @constraints  object: multiple: false
          folders?: object;
          //  @example core_ssh,core_samba,core_mosquitto @constraints  object: multiple: false
          addons?: object;
          //  @example password
          password?: string;
        }
      >;
    };
    ffmpeg: {
      // undefined
      start: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
      // undefined
      stop: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
      // undefined
      restart: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
        }
      >;
    };
    switch: {
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    update: {
      // undefined
      install: ServiceFunction<
        object,
        T,
        {
          //  @example 1.0.0
          version?: string;
          //  @constraints  boolean:
          backup?: boolean;
        }
      >;
      // undefined
      skip: ServiceFunction<object, T, object>;
      // undefined
      clearSkipped: ServiceFunction<object, T, object>;
    };
    camera: {
      // undefined
      enableMotionDetection: ServiceFunction<object, T, object>;
      // undefined
      disableMotionDetection: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      snapshot: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/snapshot_{{ entity_id.name }}.jpg
          filename: string;
        }
      >;
      // undefined
      playStream: ServiceFunction<
        object,
        T,
        {
          //
          media_player: string;
          //
          format?: "hls";
        }
      >;
      // undefined
      record: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/snapshot_{{ entity_id.name }}.mp4
          filename: string;
          //  @constraints  number: min: 1, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          lookback?: number;
        }
      >;
    };
    conversation: {
      // undefined
      process: ServiceFunction<
        object,
        T,
        {
          //  @example Turn all lights on
          text: string;
          //  @example NL
          language?: string;
          //  @example homeassistant @constraints  conversation_agent:
          agent_id?: string;
          //  @example my_conversation_1
          conversation_id?: string;
        }
      >;
      // undefined
      reload: ServiceFunction<
        object,
        T,
        {
          //  @example NL
          language?: string;
          //  @example homeassistant @constraints  conversation_agent:
          agent_id?: string;
        }
      >;
    };
    backup: {
      // undefined
      createAutomatic: ServiceFunction<object, T, object>;
    };
    googleAssistant: {
      // undefined
      requestSync: ServiceFunction<
        object,
        T,
        {
          //
          agent_user_id?: string;
        }
      >;
    };
    trend: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    tts: {
      // undefined
      speak: ServiceFunction<
        object,
        T,
        {
          //
          media_player_entity_id: string;
          //  @example My name is hanna
          message: string;
          //  @constraints  boolean:
          cache?: boolean;
          //  @example ru
          language?: string;
          //  @example platform specific @constraints  object: multiple: false
          options?: object;
        }
      >;
      // undefined
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
    button: {
      // undefined
      press: ServiceFunction<object, T, object>;
    };
    cloud: {
      // undefined
      remoteConnect: ServiceFunction<object, T, object>;
      // undefined
      remoteDisconnect: ServiceFunction<object, T, object>;
    };
    scene: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      apply: ServiceFunction<
        object,
        T,
        {
          //  @example light.kitchen: 'on' light.ceiling:   state: 'on'   brightness: 80  @constraints  object: multiple: false
          entities: object;
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
        }
      >;
      // undefined
      create: ServiceFunction<
        object,
        T,
        {
          //  @example all_lights
          scene_id: string;
          //  @example light.tv_back_light: 'on' light.ceiling:   state: 'on'   brightness: 200  @constraints  object: multiple: false
          entities?: object;
          //  @example - light.ceiling - light.kitchen
          snapshot_entities?: string;
        }
      >;
      // undefined
      delete: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
        }
      >;
    };
    logbook: {
      // undefined
      log: ServiceFunction<
        object,
        T,
        {
          //  @example Kitchen
          name: string;
          //  @example is being used
          message: string;
          //
          entity_id?: string;
          //  @example light
          domain?: string;
        }
      >;
    };
    group: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      set: ServiceFunction<
        object,
        T,
        {
          //  @example test_group
          object_id: string;
          //  @example My test group
          name?: string;
          //  @example mdi:camera @constraints  icon:
          icon?: string;
          //  @example domain.entity_id1, domain.entity_id2
          entities?: string;
          //  @example domain.entity_id1, domain.entity_id2
          add_entities?: string;
          //  @example domain.entity_id1, domain.entity_id2
          remove_entities?: string;
          //  @constraints  boolean:
          all?: boolean;
        }
      >;
      // undefined
      remove: ServiceFunction<
        object,
        T,
        {
          //  @example test_group @constraints  object: multiple: false
          object_id: object;
        }
      >;
    };
    light: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //  @example [255, 100, 100] @constraints  color_rgb:
          rgb_color?: [number, number, number];
          //  @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: any;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_pct?: number;
          //  @constraints  number: min: -100, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_step_pct?: number;
          //
          effect?: string;
          //  @example [255, 100, 100, 50] @constraints  object: multiple: false
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70] @constraints  object: multiple: false
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
          //  @example [300, 70] @constraints  object: multiple: false
          hs_color?: [number, number];
          //  @example [0.52, 0.43] @constraints  object: multiple: false
          xy_color?: [number, number];
          //  @constraints  color_temp: unit: mired, min: 153, max: 500
          color_temp?: number | object;
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          brightness?: number;
          //  @constraints  number: min: -225, max: 255, step: 1, mode: slider
          brightness_step?: number;
          //
          white?: boolean;
          //  @example relax
          profile?: string;
          //
          flash?: "long" | "short";
        }
      >;
      // undefined
      turnOff: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //
          flash?: "long" | "short";
        }
      >;
      // undefined
      toggle: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //  @example [255, 100, 100] @constraints  color_rgb:
          rgb_color?: [number, number, number];
          //  @constraints  color_temp: unit: kelvin, min: 2000, max: 6500
          color_temp_kelvin?: any;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          brightness_pct?: number;
          //
          effect?: string;
          //  @example [255, 100, 100, 50] @constraints  object: multiple: false
          rgbw_color?: [number, number, number, number];
          //  @example [255, 100, 100, 50, 70] @constraints  object: multiple: false
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
          //  @example [300, 70] @constraints  object: multiple: false
          hs_color?: [number, number];
          //  @example [0.52, 0.43] @constraints  object: multiple: false
          xy_color?: [number, number];
          //  @constraints  color_temp: unit: mired, min: 153, max: 500
          color_temp?: number | object;
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
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
    timer: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      start: ServiceFunction<
        object,
        T,
        {
          //  @example 00:01:00 or 60
          duration?: string;
        }
      >;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      cancel: ServiceFunction<object, T, object>;
      // undefined
      finish: ServiceFunction<object, T, object>;
      // undefined
      change: ServiceFunction<
        object,
        T,
        {
          //  @example 00:01:00, 60 or -60
          duration: string;
        }
      >;
    };
    zone: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    inputNumber: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, step: 0.001, mode: box
          value: number;
        }
      >;
      // undefined
      increment: ServiceFunction<object, T, object>;
      // undefined
      decrement: ServiceFunction<object, T, object>;
    };
    inputButton: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      press: ServiceFunction<object, T, object>;
    };
    inputSelect: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      selectFirst: ServiceFunction<object, T, object>;
      // undefined
      selectLast: ServiceFunction<object, T, object>;
      // undefined
      selectNext: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      selectOption: ServiceFunction<
        object,
        T,
        {
          //  @example 'Item A' @constraints  state: hide_states: unavailable,unknown, multiple: false
          option: any;
        }
      >;
      // undefined
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      setOptions: ServiceFunction<
        object,
        T,
        {
          //  @example ['Item A', 'Item B', 'Item C']
          options: string;
        }
      >;
    };
    inputBoolean: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    inputDatetime: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setDatetime: ServiceFunction<
        object,
        T,
        {
          //  @example '2019-04-20'
          date?: string;
          //  @example '05:04:20' @constraints  time:
          time?: string;
          //  @example '2019-04-20 05:04:20'
          datetime?: string;
          //  @constraints  number: min: 0, max: 9223372036854776000, mode: box, step: 1
          timestamp?: number;
        }
      >;
    };
    person: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    commandLine: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    wakeOnLan: {
      // undefined
      sendMagicPacket: ServiceFunction<
        object,
        T,
        {
          //  @example aa:bb:cc:dd:ee:ff
          mac: string;
          //  @example 192.168.255.255
          broadcast_address?: string;
          //  @constraints  number: min: 1, max: 65535, mode: box, step: 1
          broadcast_port?: number;
        }
      >;
    };
    file: {
      // undefined
      readFile: ServiceFunction<
        object,
        T,
        {
          //  @example www/my_file.json
          file_name?: string;
          //  @example JSON
          file_encoding?: "JSON" | "YAML";
        }
      >;
    };
    counter: {
      // undefined
      increment: ServiceFunction<object, T, object>;
      // undefined
      decrement: ServiceFunction<object, T, object>;
      // undefined
      reset: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, mode: box, step: 1
          value: number;
        }
      >;
    };
    fan: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage?: number;
          //  @example auto
          preset_mode?: string;
        }
      >;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      increaseSpeed: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage_step?: number;
        }
      >;
      // undefined
      decreaseSpeed: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage_step?: number;
        }
      >;
      // undefined
      oscillate: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          oscillating: boolean;
        }
      >;
      // undefined
      setDirection: ServiceFunction<
        object,
        T,
        {
          //
          direction: "forward" | "reverse";
        }
      >;
      // undefined
      setPercentage: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          percentage: number;
        }
      >;
      // undefined
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          //  @example auto
          preset_mode: string;
        }
      >;
    };
    cover: {
      // undefined
      openCover: ServiceFunction<object, T, object>;
      // undefined
      closeCover: ServiceFunction<object, T, object>;
      // undefined
      setCoverPosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          position: number;
        }
      >;
      // undefined
      stopCover: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      openCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      closeCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      stopCoverTilt: ServiceFunction<object, T, object>;
      // undefined
      setCoverTiltPosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          tilt_position: number;
        }
      >;
      // undefined
      toggleCoverTilt: ServiceFunction<object, T, object>;
    };
    template: {
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    mqtt: {
      // undefined
      publish: ServiceFunction<
        object,
        T,
        {
          //  @example /homeassistant/hello
          topic: string;
          //  @example The temperature is {{ states('sensor.temperature') }} @constraints  template:
          payload?: any;
          //  @constraints  boolean:
          evaluate_payload?: boolean;
          //
          qos?: "0" | "1" | "2";
          //  @constraints  boolean:
          retain?: boolean;
        }
      >;
      // undefined
      dump: ServiceFunction<
        object,
        T,
        {
          //  @example OpenZWave/#
          topic?: string;
          //  @constraints  number: min: 1, max: 300, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
        }
      >;
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    inputText: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example This is an example text
          value: string;
        }
      >;
    };
    schedule: {
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      getSchedule: ServiceFunction<object, T, object>;
    };
    openaiConversation: {
      // undefined
      generateContent: ServiceFunction<
        object,
        T,
        {
          //  @constraints  config_entry: integration: openai_conversation
          config_entry: any;
          //  @example Hello, how can I help you?
          prompt: string;
          //  @example - /path/to/file1.txt - /path/to/file2.txt
          filenames?: string;
        }
      >;
      // undefined
      generateImage: ServiceFunction<
        object,
        T,
        {
          //  @constraints  config_entry: integration: openai_conversation
          config_entry: any;
          //
          prompt: string;
          //  @example 1024x1024
          size?: "1024x1024" | "1024x1792" | "1792x1024";
          //  @example standard
          quality?: "standard" | "hd";
          //  @example vivid
          style?: "vivid" | "natural";
        }
      >;
    };
    tado: {
      // undefined
      addMeterReading: ServiceFunction<
        object,
        T,
        {
          //  @constraints  config_entry: integration: tado
          config_entry: any;
          //  @constraints  number: mode: box, min: 0, step: 1
          reading: number;
        }
      >;
      // undefined
      setWaterHeaterTimer: ServiceFunction<
        object,
        T,
        {
          //  @example 01:30:00
          time_period: string;
          //  @constraints  number: min: 0, max: 100, step: 0.5, unit_of_measurement: °, mode: slider
          temperature?: number;
        }
      >;
      // undefined
      setClimateTimer: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, step: 0.5, unit_of_measurement: °, mode: slider
          temperature: number;
          //  @example 01:30:00
          time_period?: string;
          //  @example MANUAL
          requested_overlay?: "NEXT_TIME_BLOCK" | "MANUAL" | "TADO_DEFAULT";
        }
      >;
      // undefined
      setClimateTemperatureOffset: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: -10, max: 10, step: 0.01, unit_of_measurement: °, mode: slider
          offset?: number;
        }
      >;
    };
    hue: {
      // undefined
      hueActivateScene: ServiceFunction<
        object,
        T,
        {
          //  @example Living Room
          group_name?: string;
          //  @example Energize
          scene_name?: string;
          //  @constraints  boolean:
          dynamic?: boolean;
        }
      >;
      // undefined
      activateScene: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 3600, unit_of_measurement: seconds, step: 1, mode: slider
          transition?: number;
          //  @constraints  boolean:
          dynamic?: boolean;
          //  @constraints  number: min: 0, max: 100, step: 1, mode: slider
          speed?: number;
          //  @constraints  number: min: 1, max: 255, step: 1, mode: slider
          brightness?: number;
        }
      >;
    };
    musicAssistant: {
      // undefined
      search: ServiceFunction<
        object,
        T,
        {
          //  @constraints  config_entry: integration: music_assistant
          config_entry_id: any;
          //  @example We Are The Champions
          name: string;
          //  @example playlist
          media_type?:
            | "artist"
            | "album"
            | "audiobook"
            | "playlist"
            | "podcast"
            | "track"
            | "radio";
          //  @example Queen
          artist?: string;
          //  @example News of the world
          album?: string;
          //  @example 25 @constraints  number: min: 1, max: 100, step: 1, mode: slider
          limit?: number;
          //  @example true @constraints  boolean:
          library_only?: boolean;
        }
      >;
      // undefined
      getLibrary: ServiceFunction<
        object,
        T,
        {
          //  @constraints  config_entry: integration: music_assistant
          config_entry_id: any;
          //  @example playlist
          media_type:
            | "artist"
            | "album"
            | "audiobook"
            | "playlist"
            | "podcast"
            | "track"
            | "radio";
          //  @example true @constraints  boolean:
          favorite?: boolean;
          //  @example We Are The Champions
          search?: string;
          //  @example 25 @constraints  number: min: 1, max: 500, step: 1, mode: slider
          limit?: number;
          //  @example 25 @constraints  number: min: 1, max: 1000000, step: 1, mode: slider
          offset?: number;
          //  @example random
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
          //  @example single
          album_type?: "album" | "single" | "compilation" | "ep" | "unknown";
          //  @example true @constraints  boolean:
          album_artists_only?: boolean;
        }
      >;
      // undefined
      playMedia: ServiceFunction<
        object,
        T,
        {
          //  @example spotify://playlist/aabbccddeeff @constraints  object: multiple: false
          media_id: object;
          //  @example playlist
          media_type?:
            | "artist"
            | "album"
            | "audiobook"
            | "folder"
            | "playlist"
            | "podcast"
            | "track"
            | "radio";
          //  @example Queen
          artist?: string;
          //  @example News of the world
          album?: string;
          //
          enqueue?: "play" | "replace" | "next" | "replace_next" | "add";
          //  @constraints  boolean:
          radio_mode?: boolean;
        }
      >;
      // undefined
      playAnnouncement: ServiceFunction<
        object,
        T,
        {
          //  @example http://someremotesite.com/doorbell.mp3
          url: string;
          //  @example true @constraints  boolean:
          use_pre_announce?: boolean;
          //  @example 75 @constraints  number: min: 1, max: 100, step: 1, mode: slider
          announce_volume?: number;
        }
      >;
      // undefined
      transferQueue: ServiceFunction<
        object,
        T,
        {
          //
          source_player?: string;
          //  @example true @constraints  boolean:
          auto_play?: boolean;
        }
      >;
      // undefined
      getQueue: ServiceFunction<object, T, object>;
    };
    webrtc: {
      // undefined
      createLink: ServiceFunction<
        object,
        T,
        {
          //  @example fd0a53ca-e9ab-4e7a-86a2-441642b16ae1
          link_id: string;
          //  @example rtsp://rtsp:12345678@192.168.1.123:554/av_stream/ch0
          url?: string;
          //  @example camera.generic_stream
          entity?: string;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: times, step: 1, mode: slider
          open_limit?: number;
          //  @constraints  number: min: 0, max: 100000, unit_of_measurement: seconds, step: 1, mode: slider
          time_to_live?: number;
        }
      >;
      // undefined
      dashCast: ServiceFunction<
        object,
        T,
        {
          //  @example media_player.mibox4
          entity_id: string;
          //  @example rtsp://rtsp:12345678@192.168.1.123:554/av_stream/ch0
          url?: string;
          //  @example camera.generic_stream
          entity?: string;
          //  @constraints  object: multiple: false
          extra?: object;
          //  @constraints  boolean:
          force?: boolean;
          //  @example http://192.168.1.123:8123
          hass_url?: string;
        }
      >;
    };
    cast: {
      // undefined
      showLovelaceView: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example lovelace-cast
          dashboard_path?: string;
          //  @example downstairs
          view_path: string;
        }
      >;
    };
    sonos: {
      // undefined
      snapshot: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @constraints  boolean:
          with_group?: boolean;
        }
      >;
      // undefined
      restore: ServiceFunction<
        object,
        T,
        {
          //
          entity_id?: string;
          //  @constraints  boolean:
          with_group?: boolean;
        }
      >;
      // undefined
      setSleepTimer: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 7200, unit_of_measurement: seconds, step: 1, mode: slider
          sleep_time?: number;
        }
      >;
      // undefined
      clearSleepTimer: ServiceFunction<object, T, object>;
      // undefined
      updateAlarm: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 1, max: 1440, mode: box, step: 1
          alarm_id: number;
          //  @example 07:00 @constraints  time:
          time?: string;
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          volume?: number;
          //  @constraints  boolean:
          enabled?: boolean;
          //  @constraints  boolean:
          include_linked_zones?: boolean;
        }
      >;
      // undefined
      playQueue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 10000, mode: box, step: 1
          queue_position?: number;
        }
      >;
      // undefined
      removeFromQueue: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 10000, mode: box, step: 1
          queue_position?: number;
        }
      >;
      // undefined
      getQueue: ServiceFunction<object, T, object>;
    };
    uiLovelaceMinimalist: {
      // Reload dashboard configuration for UI Lovelace Minimalist
      reload: ServiceFunction<object, T, object>;
    };
    climate: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      setHvacMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  state: hide_states: unavailable,unknown, multiple: false
          hvac_mode?: any;
        }
      >;
      // undefined
      setPresetMode: ServiceFunction<
        object,
        T,
        {
          //  @example away
          preset_mode: string;
        }
      >;
      // undefined
      setTemperature: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          temperature?: number;
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_high?: number;
          //  @constraints  number: min: 0, max: 250, step: 0.1, mode: box
          target_temp_low?: number;
          //
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
      // undefined
      setHumidity: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 30, max: 99, unit_of_measurement: %, step: 1, mode: slider
          humidity: number;
        }
      >;
      // undefined
      setFanMode: ServiceFunction<
        object,
        T,
        {
          //  @example low
          fan_mode: string;
        }
      >;
      // undefined
      setSwingMode: ServiceFunction<
        object,
        T,
        {
          //  @example on
          swing_mode: string;
        }
      >;
      // undefined
      setSwingHorizontalMode: ServiceFunction<
        object,
        T,
        {
          //  @example on
          swing_horizontal_mode: string;
        }
      >;
    };
    number: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example 42
          value: string;
        }
      >;
    };
    select: {
      // undefined
      selectFirst: ServiceFunction<object, T, object>;
      // undefined
      selectLast: ServiceFunction<object, T, object>;
      // undefined
      selectNext: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
      // undefined
      selectOption: ServiceFunction<
        object,
        T,
        {
          //  @example 'Item A' @constraints  state: hide_states: unavailable,unknown, multiple: false
          option: any;
        }
      >;
      // undefined
      selectPrevious: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          cycle?: boolean;
        }
      >;
    };
    text: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example Hello world!
          value: string;
        }
      >;
    };
    valve: {
      // undefined
      openValve: ServiceFunction<object, T, object>;
      // undefined
      closeValve: ServiceFunction<object, T, object>;
      // undefined
      setValvePosition: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          position: number;
        }
      >;
      // undefined
      stopValve: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    notify: {
      // undefined
      sendMessage: ServiceFunction<
        object,
        T,
        {
          //
          message: string;
          //
          title?: string;
        }
      >;
      // undefined
      persistentNotification: ServiceFunction<
        object,
        T,
        {
          //  @example The garage door has been open for 10 minutes.
          message: string;
          //  @example Your Garage Door Friend
          title?: string;
          //  @example platform specific @constraints  object: multiple: false
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
    googleAssistantSdk: {
      // undefined
      sendTextCommand: ServiceFunction<
        object,
        T,
        {
          //  @example turn off kitchen TV
          command?: string;
          //  @example media_player.living_room_speaker
          media_player?: string;
        }
      >;
    };
    mediaPlayer: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      volumeUp: ServiceFunction<object, T, object>;
      // undefined
      volumeDown: ServiceFunction<object, T, object>;
      // undefined
      mediaPlayPause: ServiceFunction<object, T, object>;
      // undefined
      mediaPlay: ServiceFunction<object, T, object>;
      // undefined
      mediaPause: ServiceFunction<object, T, object>;
      // undefined
      mediaStop: ServiceFunction<object, T, object>;
      // undefined
      mediaNextTrack: ServiceFunction<object, T, object>;
      // undefined
      mediaPreviousTrack: ServiceFunction<object, T, object>;
      // undefined
      clearPlaylist: ServiceFunction<object, T, object>;
      // undefined
      volumeSet: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 1, step: 0.01, mode: slider
          volume_level: number;
        }
      >;
      // undefined
      volumeMute: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          is_volume_muted: boolean;
        }
      >;
      // undefined
      mediaSeek: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 9223372036854776000, step: 0.01, mode: box
          seek_position: number;
        }
      >;
      // undefined
      join: ServiceFunction<
        object,
        T,
        {
          //  @example - media_player.multiroom_player2 - media_player.multiroom_player3
          group_members: string[];
        }
      >;
      // undefined
      selectSource: ServiceFunction<
        object,
        T,
        {
          //  @example video1
          source: string;
        }
      >;
      // undefined
      selectSoundMode: ServiceFunction<
        object,
        T,
        {
          //  @example Music
          sound_mode?: string;
        }
      >;
      // undefined
      playMedia: ServiceFunction<
        object,
        T,
        {
          //  @example {'media_content_id': 'https://home-assistant.io/images/cast/splash.png', 'media_content_type': 'music'} @constraints  media: multiple: false
          media: any;
          //
          enqueue?: "play" | "next" | "add" | "replace";
          //  @example true @constraints  boolean:
          announce?: boolean;
        }
      >;
      // undefined
      browseMedia: ServiceFunction<
        object,
        T,
        {
          //  @example music
          media_content_type?: string;
          //  @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
        }
      >;
      // undefined
      searchMedia: ServiceFunction<
        object,
        T,
        {
          //  @example Beatles
          search_query: string;
          //  @example music
          media_content_type?: string;
          //  @example A:ALBUMARTIST/Beatles
          media_content_id?: string | number;
          //  @example album,artist
          media_filter_classes?: string;
        }
      >;
      // undefined
      shuffleSet: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          shuffle: boolean;
        }
      >;
      // undefined
      unjoin: ServiceFunction<object, T, object>;
      // undefined
      repeatSet: ServiceFunction<
        object,
        T,
        {
          //
          repeat: "off" | "all" | "one";
        }
      >;
    };
    webostv: {
      // undefined
      button: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example LEFT
          button: string;
        }
      >;
      // undefined
      command: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example system.launcher/open
          command: string;
          //  @example target: https://www.google.com @constraints  object: multiple: false
          payload?: object;
        }
      >;
      // undefined
      selectSoundOutput: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example external_speaker
          sound_output: string;
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
          // Duration in seconds @example 10 @constraints  number: min: 0, max: 300, step: 1, mode: slider
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
          // Ringtone ID? @example 419 @constraints  number: min: 0, max: 999999, step: 1, mode: slider
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
          // Position Option @constraints  number: min: 0, max: 3, step: 1, mode: slider
          position: number;
        }
      >;
      // Save a new preset position for supported cameras
      savePresetPosition: ServiceFunction<
        object,
        T,
        {
          // Position Option @constraints  number: min: 0, max: 3, step: 1, mode: slider
          position: number;
        }
      >;
      // Delete an existing preset position for supported cameras
      deletePresetPosition: ServiceFunction<
        object,
        T,
        {
          // Position Option @constraints  number: min: 0, max: 3, step: 1, mode: slider
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
          // Duration in seconds @example 10 @constraints  number: min: 0, max: 300, step: 1, mode: slider
          duration: number;
        }
      >;
      // Send quick response, this works ONLY when camera is streaming via P2P (not RTSP)
      quickResponse: ServiceFunction<
        object,
        T,
        {
          // Voice ID stored in attributes @example 419 @constraints  number: min: 0, max: 999999, step: 1, mode: slider
          voice_id: number;
        }
      >;
      // Snooze Alarm for a Duration
      snooze: ServiceFunction<
        object,
        T,
        {
          // Snooze Duration in seconds @example 10 @constraints  number: min: 0, max: 1000, step: 1, mode: slider
          snooze_time: number;
          // Will chime be snoozed? @constraints  boolean:
          snooze_chime: boolean;
          // Will motion notifications be snoozed? @constraints  boolean:
          snooze_motion: boolean;
          // Will home base be snoozed? @constraints  boolean:
          snooze_homebase: boolean;
        }
      >;
    };
    weather: {
      // undefined
      getForecasts: ServiceFunction<
        object,
        T,
        {
          //
          type: "daily" | "hourly" | "twice_daily";
        }
      >;
    };
    deviceTracker: {
      // undefined
      see: ServiceFunction<
        object,
        T,
        {
          //  @example FF:FF:FF:FF:FF:FF
          mac?: string;
          //  @example phonedave
          dev_id?: string;
          //  @example Dave
          host_name?: string;
          //  @example home
          location_name?: string;
          //  @example [51.509802, -0.086692] @constraints  object: multiple: false
          gps?: object;
          //  @constraints  number: min: 0, mode: box, unit_of_measurement: m, step: 1
          gps_accuracy?: number;
          //  @constraints  number: min: 0, max: 100, unit_of_measurement: %, step: 1, mode: slider
          battery?: number;
        }
      >;
    };
    calendar: {
      // undefined
      createEvent: ServiceFunction<
        object,
        T,
        {
          //  @example Department Party
          summary: string;
          //  @example Meeting to provide technical review for 'Phoenix' design.
          description?: string;
          //  @example 2022-03-22 20:00:00 @constraints  datetime:
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00 @constraints  datetime:
          end_date_time?: string;
          //  @example 2022-03-22 @constraints  date:
          start_date?: string;
          //  @example 2022-03-23 @constraints  date:
          end_date?: string;
          //  @example {'days': 2} or {'weeks': 2}
          in?: object;
          //  @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
      // undefined
      getEvents: ServiceFunction<
        object,
        T,
        {
          //  @example 2022-03-22 20:00:00 @constraints  datetime:
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00 @constraints  datetime:
          end_date_time?: string;
          //  @constraints  duration:
          duration?: {
            hours?: number;
            days?: number;
            minutes?: number;
            seconds?: number;
          };
        }
      >;
    };
    remote: {
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @example BedroomTV
          activity?: string;
        }
      >;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //  @example 32756745
          device?: string;
          //  @example Play @constraints  object: multiple: false
          command: object;
          //  @constraints  number: min: 0, max: 255, step: 1, mode: slider
          num_repeats?: number;
          //  @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds, mode: slider
          delay_secs?: number;
          //  @constraints  number: min: 0, max: 60, step: 0.1, unit_of_measurement: seconds, mode: slider
          hold_secs?: number;
        }
      >;
      // undefined
      learnCommand: ServiceFunction<
        object,
        T,
        {
          //  @example television
          device?: string;
          //  @example Turn on @constraints  object: multiple: false
          command?: object;
          //
          command_type?: "ir" | "rf";
          //  @constraints  boolean:
          alternative?: boolean;
          //  @constraints  number: min: 0, max: 60, step: 5, unit_of_measurement: seconds, mode: slider
          timeout?: number;
        }
      >;
      // undefined
      deleteCommand: ServiceFunction<
        object,
        T,
        {
          //  @example television
          device?: string;
          //  @example Mute @constraints  object: multiple: false
          command: object;
        }
      >;
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
      toggleGarageDoor: ServiceFunction<object, T, object>;
      //
      stopStreamingCamera: ServiceFunction<object, T, object>;
      // undefined
      reload: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
    };
    aiTask: {
      // undefined
      generateData: ServiceFunction<
        object,
        T,
        {
          //  @example home summary
          task_name: string;
          //  @example Generate a funny notification that the garage door was left open
          instructions: string;
          //
          entity_id?: string;
          //  @example { 'name': { 'selector': { 'text': }, 'description': 'Name of the user', 'required': 'True' } } }, 'age': { 'selector': { 'number': }, 'description': 'Age of the user' } } @constraints  object: multiple: false
          structure?: object;
          //  @constraints  media: accept: *, multiple: true
          attachments?: any;
        }
      >;
      // undefined
      generateImage: ServiceFunction<
        object,
        T,
        {
          //  @example picture of a dog
          task_name: string;
          //  @example Generate a high quality square image of a dog on transparent background
          instructions: string;
          //
          entity_id: string;
          //  @constraints  media: accept: *, multiple: true
          attachments?: any;
        }
      >;
    };
    waterHeater: {
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      setAwayMode: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          away_mode: boolean;
        }
      >;
      // undefined
      setTemperature: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 250, step: 0.5, mode: box, unit_of_measurement: °
          temperature: number;
          //  @example eco
          operation_mode?: string;
        }
      >;
      // undefined
      setOperationMode: ServiceFunction<
        object,
        T,
        {
          //  @example eco
          operation_mode: string;
        }
      >;
    };
    image: {
      // undefined
      snapshot: ServiceFunction<
        object,
        T,
        {
          //  @example /tmp/image_snapshot.jpg
          filename: string;
        }
      >;
    };
    time: {
      // undefined
      setValue: ServiceFunction<
        object,
        T,
        {
          //  @example 22:15 @constraints  time:
          time: string;
        }
      >;
    };
    vacuum: {
      // undefined
      start: ServiceFunction<object, T, object>;
      // undefined
      pause: ServiceFunction<object, T, object>;
      // undefined
      returnToBase: ServiceFunction<object, T, object>;
      // undefined
      cleanSpot: ServiceFunction<object, T, object>;
      // undefined
      locate: ServiceFunction<object, T, object>;
      // undefined
      stop: ServiceFunction<object, T, object>;
      // undefined
      setFanSpeed: ServiceFunction<
        object,
        T,
        {
          //  @example low
          fan_speed: string;
        }
      >;
      // undefined
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //  @example set_dnd_timer
          command: string;
          //  @example { 'key': 'value' } @constraints  object: multiple: false
          params?: object;
        }
      >;
    };
    roborock: {
      // undefined
      getMaps: ServiceFunction<object, T, object>;
      // undefined
      getVacuumCurrentPosition: ServiceFunction<object, T, object>;
      // undefined
      setVacuumGotoPosition: ServiceFunction<
        object,
        T,
        {
          //  @example 27500
          x: string;
          //  @example 32000
          y: string;
        }
      >;
    };
    lock: {
      // undefined
      unlock: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      lock: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      open: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
    };
    alarmControlPanel: {
      // undefined
      alarmDisarm: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmHome: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmAway: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmNight: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmVacation: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmArmCustomBypass: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
      // undefined
      alarmTrigger: ServiceFunction<
        object,
        T,
        {
          //  @example 1234
          code?: string;
        }
      >;
    };
    assistSatellite: {
      // undefined
      announce: ServiceFunction<
        object,
        T,
        {
          //  @example Time to wake up!
          message?: string;
          //  @constraints  media: accept: audio/*, multiple: false
          media_id?: any;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*, multiple: false
          preannounce_media_id?: any;
        }
      >;
      // undefined
      startConversation: ServiceFunction<
        object,
        T,
        {
          //  @example You left the lights on in the living room. Turn them off?
          start_message?: string;
          //  @constraints  media: accept: audio/*, multiple: false
          start_media_id?: any;
          //
          extra_system_prompt?: string;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*, multiple: false
          preannounce_media_id?: any;
        }
      >;
      // undefined
      askQuestion: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          //  @example What kind of music would you like to play?
          question?: string;
          //  @constraints  media: accept: audio/*, multiple: false
          question_media_id?: any;
          //  @constraints  boolean:
          preannounce?: boolean;
          //  @constraints  media: accept: audio/*, multiple: false
          preannounce_media_id?: any;
          //  @constraints  object: label_field: sentences, description_field: id, multiple: true, translation_key: answers, fields: [object Object]
          answers?: object;
        }
      >;
    };
    bambuLab: {
      // Send an arbitrary gcode command to the 3D printer
      sendCommand: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // The command to send to the printer. Must have a trailing new line. @example M104 S200
          command: string;
        }
      >;
      // Print sliced 3MF file stored on the SD card
      printProjectFile: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // Filename on SD card @example filename.3mf
          filepath: string;
          //  @constraints  number: mode: box, min: 1, max: 100, step: 1
          plate: number;
          //  @constraints  boolean:
          timelapse: boolean;
          //  @constraints  boolean:
          bed_leveling: boolean;
          //  @constraints  boolean:
          flow_cali: boolean;
          //  @constraints  boolean:
          vibration_cali: boolean;
          //  @constraints  boolean:
          layer_inspect: boolean;
          //  @constraints  boolean:
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
          //
          device_id: string;
          // Object IDs are available from printable objects entity attributes @example 409,1463
          objects: string;
        }
      >;
      // Move the printhead or bed
      moveAxis: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // The axis to move. X/P/H printers, X and Y move the printhead, Z moves the bed. A1, X moves the printhead, Y the bed, Z moves the gantry. @example X
          axis: "X" | "Y" | "Z" | "Home";
          // The distance (in mm) to move the axis A negative distance moves Z up, X left, Y forward. @example 10 @constraints  number: min: -100, max: 100, step: 1, mode: slider
          distance?: number;
        }
      >;
      // Unload the filament currently loaded into the extruder
      unloadFilament: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
        }
      >;
      // Load a new filament into the extruder passed an AMS tray or an External spool entity
      loadFilament: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          // Target nozzle temperature once the filament is loaded. By default uses the midpoint between min and max temperature of the chosen filament. @example 220 @constraints  number: min: 0, max: 250, step: 1, mode: slider
          temperature?: number;
        }
      >;
      // Perform an extrusion or extraction of the loaded filament
      extrudeRetract: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // The type of extrude action to perform @example Extrude
          type: "Extrude" | "Retract";
          // Perform extrusion or retraction if nozzle temperature is below 170ºC. @constraints  boolean:
          force?: boolean;
        }
      >;
      // Sets filament details on an AMS tray or an External spool entity
      setFilament: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
          // Bambu's filament ID. E.g. GFL96 is Generic PLA Silk @example GFL96
          tray_info_idx: string;
          // RGBA value for the color. E.g. FF0000FF is opaque red. @example FF0000FF
          tray_color: string;
          // Type of filament. E.g. 'PLA' or 'PETG' @example PLA
          tray_type: string;
          // The minimum temperature that it is recommended to print this filament at. @example 220 @constraints  number: min: 160, max: 300, step: 1, mode: slider
          nozzle_temp_min: number;
          // The maximum temperature that it is recommended to print this filament at. @example 220 @constraints  number: min: 160, max: 300, step: 1, mode: slider
          nozzle_temp_max: number;
        }
      >;
      // Gets a json string with details about all known filaments
      getFilamentData: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
        }
      >;
      // Triggers the AMS to attempt to re-read the RFID tag on the current spool.
      readRfid: ServiceFunction<
        object,
        T,
        {
          //
          entity_id: string;
        }
      >;
      // Starts AMS filament drying.
      startFilamentDrying: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          // AMS 2 max is 65C. AMS HT max is 85C. @example 45 @constraints  number: min: 45, max: 85, step: 1, mode: slider
          temp: number;
          //  @constraints  boolean:
          rotate_tray: boolean;
          //  @constraints  number: min: 1, max: 24, step: 1, mode: slider
          duration: number;
        }
      >;
      // Stops AMS filament drying.
      stopFilamentDrying: ServiceFunction<
        object,
        T,
        {
          // Select the AMS 2 or AMS HT device to stop drying on.
          device_id: string;
        }
      >;
    };
    fullyKiosk: {
      // undefined
      loadUrl: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example https://home-assistant.io
          url: string;
        }
      >;
      // undefined
      startApplication: ServiceFunction<
        object,
        T,
        {
          //  @example de.ozerov.fully
          application: string;
          //
          device_id: string;
        }
      >;
      // undefined
      setConfig: ServiceFunction<
        object,
        T,
        {
          //
          device_id: string;
          //  @example motionSensitivity
          key: string;
          //  @example 90
          value: string;
        }
      >;
    };
    google: {
      // undefined
      createEvent: ServiceFunction<
        object,
        T,
        {
          //  @example Bowling
          summary: string;
          //  @example Birthday bowling
          description?: string;
          //  @example 2022-03-22 20:00:00
          start_date_time?: string;
          //  @example 2022-03-22 22:00:00
          end_date_time?: string;
          //  @example 2022-03-10
          start_date?: string;
          //  @example 2022-03-11
          end_date?: string;
          //  @example 'days': 2 or 'weeks': 2 @constraints  object: multiple: false
          in?: object;
          //  @example Conference Room - F123, Bldg. 002
          location?: string;
        }
      >;
    };
    automation: {
      // undefined
      trigger: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          skip_condition?: boolean;
        }
      >;
      // undefined
      toggle: ServiceFunction<object, T, object>;
      // undefined
      turnOn: ServiceFunction<object, T, object>;
      // undefined
      turnOff: ServiceFunction<
        object,
        T,
        {
          //  @constraints  boolean:
          stop_actions?: boolean;
        }
      >;
      // undefined
      reload: ServiceFunction<object, T, object>;
    };
    zha: {
      // undefined
      permit: ServiceFunction<
        object,
        T,
        {
          //  @constraints  number: min: 0, max: 254, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee?: string;
          //  @example 00:0a:bf:00:01:10:23:35
          source_ieee?: string;
          //  @example 1234-5678-1234-5678-AABB-CCDD-AABB-CCDD-EEFF
          install_code?: string;
          //  @example Z:000D6FFFFED4163B$I:52797BF4A5084DAA8E1712B61741CA024051
          qr_code?: string;
        }
      >;
      // undefined
      remove: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
        }
      >;
      // undefined
      setZigbeeClusterAttribute: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 1, max: 65535, mode: box, step: 1
          endpoint_id: number;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          cluster_id: number;
          //
          cluster_type?: "in" | "out";
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          attribute: number;
          //  @example 1
          value: string;
          //  @example 252
          manufacturer?: string;
        }
      >;
      // undefined
      issueZigbeeClusterCommand: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          endpoint_id: number;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          cluster_id: number;
          //
          cluster_type?: "in" | "out";
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          command: number;
          //
          command_type: "client" | "server";
          //  @example [arg1, arg2, argN] @constraints  object: multiple: false
          args?: object;
          //  @constraints  object: multiple: false
          params?: object;
          //  @example 252
          manufacturer?: string;
        }
      >;
      // undefined
      issueZigbeeGroupCommand: ServiceFunction<
        object,
        T,
        {
          //  @example 546
          group: string;
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          cluster_id: number;
          //
          cluster_type?: "in" | "out";
          //  @constraints  number: min: 1, max: 65535, step: 1, mode: slider
          command: number;
          //  @example [arg1, arg2, argN] @constraints  object: multiple: false
          args?: object;
          //  @example 252
          manufacturer?: string;
        }
      >;
      // undefined
      warningDeviceSquawk: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 0, max: 1, mode: box, step: 1
          mode?: number;
          //  @constraints  number: min: 0, max: 1, mode: box, step: 1
          strobe?: number;
          //  @constraints  number: min: 0, max: 3, mode: box, step: 1
          level?: number;
        }
      >;
      // undefined
      warningDeviceWarn: ServiceFunction<
        object,
        T,
        {
          //  @example 00:0d:6f:00:05:7d:2d:34
          ieee: string;
          //  @constraints  number: min: 0, max: 6, mode: box, step: 1
          mode?: number;
          //  @constraints  number: min: 0, max: 1, mode: box, step: 1
          strobe?: number;
          //  @constraints  number: min: 0, max: 3, mode: box, step: 1
          level?: number;
          //  @constraints  number: min: 0, max: 65535, unit_of_measurement: seconds, step: 1, mode: slider
          duration?: number;
          //  @constraints  number: min: 0, max: 100, step: 10, mode: slider
          duty_cycle?: number;
          //  @constraints  number: min: 0, max: 3, mode: box, step: 1
          intensity?: number;
        }
      >;
      // undefined
      setLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
          //  @example 1234
          user_code: string;
        }
      >;
      // undefined
      enableLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
        }
      >;
      // undefined
      disableLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
        }
      >;
      // undefined
      clearLockUserCode: ServiceFunction<
        object,
        T,
        {
          //  @example 1
          code_slot: string;
        }
      >;
    };
    siren: {
      // undefined
      turnOn: ServiceFunction<
        object,
        T,
        {
          //  @example fire
          tone?: string;
          //  @example 0.5 @constraints  number: min: 0, max: 1, step: 0.05, mode: slider
          volume_level?: number;
          //  @example 15
          duration?: string;
        }
      >;
      // undefined
      turnOff: ServiceFunction<object, T, object>;
      // undefined
      toggle: ServiceFunction<object, T, object>;
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
      | "update.go2rtc_update"
      | "update.home_assistant_operating_system_update"
      | "conversation.home_assistant"
      | "binary_sensor.humidity_rising"
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
      | "scene.ventilation_off"
      | "scene.ventilation_setting_1"
      | "scene.ventilation_setting_2"
      | "scene.ventilation_speed_3"
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
      | "zone.work_claire"
      | "zone.parents_rens"
      | "zone.parents_claire"
      | "zone.frontliners"
      | "zone.de_keet"
      | "input_number.garage_door_current_orientation"
      | "input_number.garage_door_last_orientation"
      | "input_select.wled_live_override"
      | "input_boolean.minimalist_welcome_toggle"
      | "zone.home"
      | "person.rens"
      | "person.claire"
      | "sun.sun"
      | "sensor.sun_next_dawn"
      | "sensor.sun_next_dusk"
      | "sensor.sun_next_midnight"
      | "sensor.sun_next_noon"
      | "sensor.sun_next_rising"
      | "sensor.sun_next_setting"
      | "tag.217c05de_0873_415d_988f_9716201958eb"
      | "sensor.count_lights_on"
      | "sensor.living_room_temperature"
      | "sensor.living_room_humidity"
      | "sensor.outside_temperature"
      | "sensor.outside_humidity"
      | "sensor.rain_incoming"
      | "sensor.lg_channel"
      | "sensor.date_and_time"
      | "fan.mechanical_ventilation"
      | "cover.garage_door_cover"
      | "sensor.cpu_temperature"
      | "button.shelly_plus_1_reboot"
      | "event.shellyplus1_a8032ab8a210_input_0"
      | "switch.garage_door"
      | "update.shelly_plus_1_firmware_update"
      | "binary_sensor.zonnescherm_overheating"
      | "button.zonnescherm_reboot"
      | "cover.zonnescherm"
      | "sensor.zonnescherm_power"
      | "sensor.zonnescherm_energy"
      | "sensor.neerslag_buienalarm_regen_data"
      | "sensor.neerslag_buienradar_regen_data"
      | "media_player.lg_c8"
      | "weather.huis"
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
      | "binary_sensor.radarr_health"
      | "calendar.radarr"
      | "sensor.radarr_disk_space_movies"
      | "binary_sensor.morning"
      | "binary_sensor.evening"
      | "binary_sensor.night"
      | "binary_sensor.afternoon"
      | "binary_sensor.rpi_power_status"
      | "media_player.chromecast"
      | "remote.chromecast"
      | "script.set_home_to_away_mode"
      | "script.cast_camera_to_driveway_monitor"
      | "script.turn_off_all_lights"
      | "script.ventilation_on_full_speed"
      | "script.turn_ventilation_off"
      | "script.good_morning"
      | "script.toggle_ventilation"
      | "script.timed_bedroom_fan"
      | "script.show_ha_settings_on_tablet"
      | "script.toggle_garage_door"
      | "script.stop_streaming_camera"
      | "conversation.chatgpt"
      | "ai_task.openai_ai_task"
      | "sensor.sonarr_upcoming"
      | "switch.mini_graph_card_pre_release"
      | "switch.card_mod_pre_release"
      | "update.layout_card_update"
      | "update.ui_lovelace_minimalist_update"
      | "update.eufy_security_update"
      | "update.fontawesome_update"
      | "update.mini_graph_card_update"
      | "update.button_card_update"
      | "update.webrtc_camera_update"
      | "update.bambu_lab_update"
      | "update.card_mod_update"
      | "update.browser_mod_update"
      | "update.light_entity_card_update"
      | "update.hacs_update"
      | "update.kiosk_mode_update_2"
      | "update.mushroom_update"
      | "update.plex_recently_added_sensor_update"
      | "update.hass_hue_icons_update"
      | "update.zonneplan_update"
      | "update.auto_entities_update"
      | "binary_sensor.hue_motion_sensor_hal_motion"
      | "binary_sensor.tv_entertainment_configuration"
      | "binary_sensor.entertainmentruimte_1_entertainment_configuration"
      | "binary_sensor.hal_motion"
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
      | "light.nachtkastje_rens"
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
      | "light.kleedkamer_plafond"
      | "light.hue_impress_outdoor_wall_1"
      | "light.hue_color_lamp_1"
      | "light.nachtkastje_claire"
      | "light.hue_play_2"
      | "light.tuin"
      | "light.woonkamer"
      | "light.kantoor_2"
      | "light.keuken"
      | "light.benedenverdieping"
      | "light.slaapkamer"
      | "light.hal"
      | "light.spotjes_keuken"
      | "light.bovenverdieping"
      | "light.spotjes"
      | "light.kleedkamer"
      | "light.zolder"
      | "scene.kleedkamer_savanne_zonsondergang"
      | "scene.slaapkamer_shine"
      | "scene.benedenverdieping_tropische_schemering"
      | "scene.keuken_nachtlampje"
      | "scene.kantoor_savanne_zonsondergang"
      | "scene.bovenverdieping_savanne_zonsondergang"
      | "scene.keuken_energize"
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
      | "scene.keuken_read"
      | "scene.spotjes_helder"
      | "scene.kantoor_gedimd"
      | "scene.slaapkamer_energize"
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
      | "scene.keuken_concentrate"
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
      | "scene.keuken_relax"
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
      | "sensor.hal_illuminance"
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
      | "switch.automation_niko_eetkamer"
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
      | "device_tracker.rens_iphone_tado"
      | "device_tracker.claire_s_telefoon_3"
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
      | "water_heater.warm_water"
      | "climate.tado"
      | "binary_sensor.roborock_s8_mop_attached"
      | "binary_sensor.roborock_s8_water_box_attached"
      | "binary_sensor.roborock_s8_water_shortage"
      | "binary_sensor.roborock_s8_cleaning"
      | "binary_sensor.roborock_s8_charging"
      | "image.roborock_s8_bovenverdieping"
      | "image.roborock_s8_badkamer"
      | "image.roborock_s8_zolder"
      | "image.roborock_s8_onderverdieping"
      | "number.roborock_s8_volume"
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
      | "switch.roborock_s8_child_lock"
      | "switch.roborock_s8_do_not_disturb"
      | "time.roborock_s8_do_not_disturb_begin"
      | "time.roborock_s8_do_not_disturb_end"
      | "vacuum.roborock_s8"
      | "sensor.dcp_l2530dw_status"
      | "sensor.dcp_l2530dw_page_counter"
      | "sensor.dcp_l2530dw_duplex_unit_page_counter"
      | "sensor.dcp_l2530dw_drum_remaining_lifetime"
      | "sensor.dcp_l2530dw_drum_remaining_pages"
      | "sensor.dcp_l2530dw_drum_page_counter"
      | "sensor.dcp_l2530dw_black_toner_remaining"
      | "button.nest_wifi_kantoor_favorite_current_song"
      | "media_player.nest_wifi_kantoor_ma"
      | "button.google_home_mini_favorite_current_song"
      | "media_player.google_home_mini_ma"
      | "button.nest_hub_favorite_current_song"
      | "media_player.nest_hub_ma"
      | "button.roborock_s8_pet_area_cleaning"
      | "button.roborock_s8_deep"
      | "button.roborock_s8_full_cleaning"
      | "media_player.nest_wifi_kantoor"
      | "stt.elevenlabs_speech_to_text"
      | "media_player.tv"
      | "binary_sensor.ib0819992320_connection_state"
      | "sensor.energy_production_today"
      | "sensor.energy_production_today_remaining"
      | "sensor.energy_production_tomorrow"
      | "sensor.power_highest_peak_time_today"
      | "sensor.power_highest_peak_time_tomorrow"
      | "sensor.power_production_now"
      | "sensor.energy_current_hour"
      | "sensor.energy_next_hour"
      | "media_player.nest_hub"
      | "camera.buienradar"
      | "media_player.google_home_mini"
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
      | "weather.buienradar"
      | "tts.elevenlabs"
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
      | "select.home_assistant_voice_0969ee_assistant"
      | "select.home_assistant_voice_0969ee_assistant_2"
      | "select.home_assistant_voice_0969ee_finished_speaking_detection"
      | "select.home_assistant_voice_0969ee_wake_word"
      | "select.home_assistant_voice_0969ee_wake_word_2"
      | "switch.home_assistant_voice_0969ee_mute"
      | "switch.home_assistant_voice_0969ee_wake_sound"
      | "light.home_assistant_voice_0969ee_led_ring"
      | "event.home_assistant_voice_0969ee_button_press"
      | "select.home_assistant_voice_0969ee_wake_word_sensitivity"
      | "update.home_assistant_voice_0969ee_home_assistant_voice_0969ee"
      | "media_player.home_assistant_voice_0969ee_media_player"
      | "sensor.woonkamer_audio_input_format"
      | "binary_sensor.woonkamer_microphone"
      | "media_player.sonos_living_room"
      | "assist_satellite.home_assistant_voice_0969ee_assist_satellite"
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
      | "calendar.clairebongers_gmail_com"
      | "calendar.feestdagen_in_nederland"
      | "calendar.persoonlijk_rens"
      | "calendar.gezin"
      | "calendar.family"
      | "calendar.rensknoors_gmail_com"
      | "calendar.birthdays"
      | "binary_sensor.xiaomi_pad_5_kiosk_mode"
      | "binary_sensor.xiaomi_pad_5_plugged_in"
      | "binary_sensor.xiaomi_pad_5_device_admin"
      | "button.xiaomi_pad_5_restart_browser"
      | "button.xiaomi_pad_5_restart_device"
      | "button.xiaomi_pad_5_bring_to_foreground"
      | "button.xiaomi_pad_5_send_to_background"
      | "button.xiaomi_pad_5_load_start_url"
      | "button.xiaomi_pad_5_clear_browser_cache"
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
      | "sensor.xiaomi_pad_5_internal_storage_free_space"
      | "sensor.xiaomi_pad_5_internal_storage_total_space"
      | "sensor.xiaomi_pad_5_free_memory"
      | "sensor.xiaomi_pad_5_total_memory"
      | "switch.xiaomi_pad_5_screensaver"
      | "switch.xiaomi_pad_5_maintenance_mode"
      | "switch.xiaomi_pad_5_kiosk_lock"
      | "switch.xiaomi_pad_5_motion_detection"
      | "switch.xiaomi_pad_5_screen"
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
      | "select.voordeur_motion_detection_type"
      | "select.garage_motion_detection_type"
      | "sensor.voordeur_days_since_last_charging"
      | "sensor.garage_days_since_last_charging"
      | "sensor.voordeur_video_codec"
      | "sensor.garage_video_codec"
      | "button.garage_start_rtsp_stream"
      | "button.garage_stop_rtsp_stream"
      | "sensor.smartplug_washing_machine_power_factor"
      | "image.roborock_s8"
      | "switch.automation_avond"
      | "device_tracker.claire_s_telefoon_2"
      | "sensor.front_window_cover_window_covering_type"
      | "sensor.zonneplan_one_omvormer_current_scenario"
      | "sensor.smartplug_3d_printer_power_factor"
      | "sensor.xiaomi_pad_5_foreground_app"
      | "sensor.bambu_lab_p1s_active_tray"
      | "sensor.bambu_lab_p1s_active_tray_index"
      | "fan.bambu_lab_p1s_aux_fan"
      | "sensor.bambu_lab_p1s_aux_fan_speed"
      | "sensor.bambu_lab_p1s_bed_temperature"
      | "image.bambu_lab_p1s_camera"
      | "fan.bambu_lab_p1s_chamber_fan"
      | "sensor.bambu_lab_p1s_chamber_fan_speed"
      | "light.bambu_lab_p1s_chamber_light"
      | "fan.bambu_lab_p1s_cooling_fan"
      | "sensor.bambu_lab_p1s_cooling_fan_speed"
      | "sensor.bambu_lab_p1s_current_layer"
      | "sensor.bambu_lab_p1s_current_stage"
      | "sensor.bambu_lab_p1s_end_time"
      | "binary_sensor.bambu_lab_p1s_firmware_update"
      | "button.bambu_lab_p1s_force_refresh_data"
      | "sensor.bambu_lab_p1s_gcode_filename"
      | "sensor.bambu_lab_p1s_heatbreak_fan_speed"
      | "binary_sensor.bambu_lab_p1s_hms_errors"
      | "switch.bambu_lab_p1s_manual_refresh_mode"
      | "sensor.bambu_lab_p1s_mqtt_connection_mode"
      | "sensor.bambu_lab_p1s_nozzle_size"
      | "sensor.bambu_lab_p1s_nozzle_target_temperature"
      | "sensor.bambu_lab_p1s_nozzle_temperature"
      | "sensor.bambu_lab_p1s_nozzle_type"
      | "binary_sensor.bambu_lab_p1s_online"
      | "button.bambu_lab_p1s_pause_printing"
      | "sensor.bambu_lab_p1s_print_progress"
      | "sensor.bambu_lab_p1s_print_status"
      | "sensor.bambu_lab_p1s_print_type"
      | "select.bambu_lab_p1s_printing_speed"
      | "binary_sensor.bambu_lab_p1s_recording_timelapse"
      | "sensor.bambu_lab_p1s_remaining_time"
      | "button.bambu_lab_p1s_resume_printing"
      | "sensor.bambu_lab_p1s_speed_profile"
      | "sensor.bambu_lab_p1s_start_time"
      | "button.bambu_lab_p1s_stop_printing"
      | "sensor.bambu_lab_p1s_target_bed_temperature"
      | "sensor.bambu_lab_p1s_task_name"
      | "sensor.bambu_lab_p1s_total_layer_count"
      | "sensor.bambu_lab_p1s_total_usage"
      | "sensor.bambu_lab_p1s_wi_fi_signal"
      | "sensor.bambu_lab_ams_humidity_index"
      | "sensor.bambu_lab_ams_tray_1"
      | "sensor.bambu_lab_ams_tray_2"
      | "sensor.bambu_lab_ams_tray_3"
      | "sensor.bambu_lab_ams_tray_4"
      | "sensor.bambu_lab_external_spool_external_spool"
      | "binary_sensor.bambu_lab_p1s_print_error"
      | "camera.bambu_lab_p1s_camera"
      | "number.bambu_lab_p1s_nozzle_target_temperature"
      | "number.bambu_lab_p1s_bed_target_temperature"
      | "switch.bambu_lab_p1s_enable_camera"
      | "switch.bambu_lab_p1s_use_image_sensor_camera"
      | "sensor.bambu_lab_p1s_ip_address"
      | "image.bambu_lab_p1s_cover_image"
      | "image.bambu_lab_p1s_pick_image"
      | "sensor.bambu_lab_p1s_printable_objects"
      | "sensor.bambu_lab_p1s_skipped_objects"
      | "sensor.bambu_lab_p1s_print_length"
      | "sensor.bambu_lab_p1s_print_weight"
      | "switch.bambu_lab_p1s_load_model_data_from_printer"
      | "sensor.bambu_lab_p1s_print_bed_type"
      | "sensor.bambu_lab_p1s_gcode_file_downloaded"
      | "switch.bambu_lab_p1s_save_gcode_file_in_ha"
      | "binary_sensor.bambu_lab_p1s_extruder_filament_state"
      | "sensor.bambu_lab_p1s_sd_card_status"
      | "binary_sensor.bambu_lab_p1s_developer_lan_mode"
      | "binary_sensor.bambu_lab_p1s_mqtt_encryption_firmware"
      | "binary_sensor.bambu_lab_external_spool_active"
      | "sensor.bambu_lab_p1s_model_download"
      | "binary_sensor.bambu_lab_p1s_hybrid_mqtt_blocks_control"
      | "binary_sensor.backups_stale"
      | "sensor.backup_state";
  }
}
