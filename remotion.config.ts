/**
 * Note: When using the Node.JS APIs, the config file
 * doesn't apply. Instead, pass options directly to the APIs.
 *
 * All configuration options: https://remotion.dev/docs/config
 */

import {Config} from '@remotion/cli/config';
import {webpackOverride} from './src/webpack-override';

Config.setScale(2);

Config.setVideoImageFormat('png');
Config.setPixelFormat('yuva444p10le');
Config.setCodec('prores');
Config.setProResProfile('4444');

Config.setOverwriteOutput(true);

Config.overrideWebpackConfig(webpackOverride);
