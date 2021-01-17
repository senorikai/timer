import config from './config'
import implementations from './implementations'
import { Machine } from 'xstate'

const trafficMachine = Machine(config, implementations);

export default trafficMachine;