import {
    calculateExpression,
    parseExpression,
    TabKey
} from "./calculateExpression";
import Vue from "vue";

const initialData = {
    initialTab: "",
    minutes: {
        minuteInterval: 1
    },
    hourly: {
        minutes: 0,
        hourInterval: 1
    },
    daily: {
        minutes: 0,
        hours: 0,
        dayInterval: 1
    },
    weekly: {
        minutes: 0,
        hours: 0,
        days: []
    },
    monthly: {
        hours: 0,
        minutes: 0,
        day: 1,
        monthInterval: 1
    },
    advanced: {
        cronExpression: ""
    }
};

export default Vue.extend({
    created() {
        const tabData = parseExpression(this.value);
        const initialTab = tabData.type as string;
        this.initialTab = initialTab;
        this.$data[initialTab] = { ...tabData };
    },
    props: {
        value: { type: String }
    },
    data() {
        return JSON.parse(JSON.stringify(initialData)); // deep copy
    },
    methods: {
        _updateCronExpr(event: any, type: TabKey) {
            const cronExpression = calculateExpression({
                ...event,
                type: type
            });
            this.$emit("input", cronExpression);
        },
        resetToTab(tabKey: TabKey) {
            this.$data[tabKey] = initialData[tabKey];
            this._updateCronExpr(initialData[tabKey], tabKey);
        }
    },
    watch: {
        minutes: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, "minutes");
            }
        },
        hourly: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, "hourly");
            }
        },
        daily: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, "daily");
            }
        },
        weekly: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, "weekly");
            }
        },
        monthly: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, "monthly");
            }
        },
        advanced: {
            deep: true,
            handler(e) {
                this._updateCronExpr(e, "advanced");
            }
        }
    }
});
