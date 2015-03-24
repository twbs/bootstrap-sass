/* http://keith-wood.name/datepick.html
   Date picker for jQuery v5.0.0.
   Written by Keith Wood (kbwood{at}iinet.com.au) February 2010.
   Licensed under the MIT (https://github.com/jquery/jquery/blob/master/MIT-LICENSE.txt) licence. 
   Please attribute the author if you use it. */

(function($) { // Hide scope, no $ conflict

	var pluginName = 'datepick';


	/** Create the datepicker plugin.
		<p>Sets an input field to popup a calendar for date entry,
			or a <code>div</code> or <code>span</code> to show an inline calendar.</p>
		<p>Expects HTML like:</p>
		<pre>&lt;input type="text"> or &lt;div>&lt;/div></pre>
		<p>Provide inline configuration like:</p>
		<pre>&lt;input type="text" data-datepick="name: 'value'"/></pre>
	 	@module Datepick
		@augments JQPlugin
		@example $(selector).datepick()
 $(selector).datepick({minDate: 0, maxDate: '+1m +1w'}) */
	$.JQPlugin.createPlugin({
	
		/** The name of the plugin. */
		name: pluginName,
		
		/** Default template for generating a datepicker.
			Insert anywhere: '{l10n:name}' to insert localised value for name,
			'{link:name}' to insert a link trigger for command name,
			'{button:name}' to insert a button trigger for command name,
			'{popup:start}...{popup:end}' to mark a section for inclusion in a popup datepicker only,
			'{inline:start}...{inline:end}' to mark a section for inclusion in an inline datepicker only.
			@property picker {string} Overall structure: '{months}' to insert calendar months.
			@property monthRow {string} One row of months: '{months}' to insert calendar months.
			@property month {string} A single month: '{monthHeader<em>:dateFormat</em>}' to insert the month header -
						<em>dateFormat</em> is optional and defaults to 'MM yyyy',
						'{weekHeader}' to insert a week header, '{weeks}' to insert the month's weeks.
			@property weekHeader {string} A week header: '{days}' to insert individual day names.
			@property dayHeader {string} Individual day header: '{day}' to insert day name.
			@property week {string} One week of the month: '{days}' to insert the week's days,
						'{weekOfYear}' to insert week of year.
			@property day {string} An individual day: '{day}' to insert day value.
			@property monthSelector {string} jQuery selector, relative to picker, for a single month.
			@property daySelector {string} jQuery selector, relative to picker, for individual days.
			@property rtlClass {string} Class for right-to-left (RTL) languages.
			@property multiClass {string} Class for multi-month datepickers.
			@property defaultClass {string} Class for selectable dates.
			@property selectedClass {string} Class for currently selected dates.
			@property highlightedClass {string} Class for highlighted dates.
			@property todayClass {string} Class for today.
			@property otherMonthClass {string} Class for days from other months.
			@property weekendClass {string} Class for days on weekends.
			@property commandClass {string} Class prefix for commands.
			@property commandButtonClass {string} Extra class(es) for commands that are buttons.
			@property commandLinkClass {string} Extra class(es) for commands that are links.
			@property disabledClass {string} Class for disabled commands. */
		defaultRenderer: {
			picker: '<div class="datepick">' +
			'<div class="datepick-nav">{link:prev}{link:today}{link:next}</div>{months}' +
			'{popup:start}<div class="datepick-ctrl">{link:clear}{link:close}</div>{popup:end}' +
			'<div class="datepick-clear-fix"></div></div>',
			monthRow: '<div class="datepick-month-row">{months}</div>',
			month: '<div class="datepick-month"><div class="datepick-month-header">{monthHeader}</div>' +
			'<table><thead>{weekHeader}</thead><tbody>{weeks}</tbody></table></div>',
			weekHeader: '<tr>{days}</tr>',
			dayHeader: '<th>{day}</th>',
			week: '<tr>{days}</tr>',
			day: '<td>{day}</td>',
			monthSelector: '.datepick-month',
			daySelector: 'td',
			rtlClass: 'datepick-rtl',
			multiClass: 'datepick-multi',
			defaultClass: '',
			selectedClass: 'datepick-selected',
			highlightedClass: 'datepick-highlight',
			todayClass: 'datepick-today',
			otherMonthClass: 'datepick-other-month',
			weekendClass: 'datepick-weekend',
			commandClass: 'datepick-cmd',
			commandButtonClass: '',
			commandLinkClass: '',
			disabledClass: 'datepick-disabled'
		},
	
		/** Command actions that may be added to a layout by name.
			<ul>
			<li>prev - Show the previous month (based on <code>monthsToStep</code> option) - <em>PageUp</em></li>
			<li>prevJump - Show the previous year (based on <code>monthsToJump</code> option) - <em>Ctrl+PageUp</em></li>
			<li>next - Show the next month (based on <code>monthsToStep</code> option) - <em>PageDown</em></li>
			<li>nextJump - Show the next year (based on <code>monthsToJump</code> option) - <em>Ctrl+PageDown</em></li>
			<li>current - Show the currently selected month or today's if none selected - <em>Ctrl+Home</em></li>
			<li>today - Show today's month - <em>Ctrl+Home</em></li>
			<li>clear - Erase the date and close the datepicker popup - <em>Ctrl+End</em></li>
			<li>close - Close the datepicker popup - <em>Esc</em></li>
			<li>prevWeek - Move the cursor to the previous week - <em>Ctrl+Up</em></li>
			<li>prevDay - Move the cursor to the previous day - <em>Ctrl+Left</em></li>
			<li>nextDay - Move the cursor to the next day - <em>Ctrl+Right</em></li>
			<li>nextWeek - Move the cursor to the next week - <em>Ctrl+Down</em></li>
			</ul>
			The command name is the key name and is used to add the command to a layout
			with '{button:name}' or '{link:name}'. Each has the following attributes.
			@property text {string} The field in the regional settings for the displayed text.
			@property status {string} The field in the regional settings for the status text.
			@property keystroke {object} The keystroke to trigger the action, with attributes:
				<code>keyCode</code> {number} the code for the keystroke,
				<code>ctrlKey</code> {boolean} <code>true</code> if <em>Ctrl</em> is required,
				<code>altKey</code> {boolean} <code>true</code> if <em>Alt</em> is required,
				<code>shiftKey</code> {boolean} <code>true</code> if <em>Shift</em> is required.
			@property enabled {DatepickCommandEnabled} The function that indicates the command is enabled.
			@property date {DatepickCommandDate} The function to get the date associated with this action.
			@property action {DatepickCommandAction} The function that implements the action. */
		commands: {
			prev: {text: 'prevText', status: 'prevStatus', // Previous month
				keystroke: {keyCode: 33}, // Page up
				enabled: function(inst) {
					var minDate = inst.curMinDate();
					return (!minDate || plugin.add(plugin.day(
						plugin._applyMonthsOffset(plugin.add(plugin.newDate(inst.drawDate),
						1 - inst.options.monthsToStep, 'm'), inst), 1), -1, 'd').
						getTime() >= minDate.getTime()); },
				date: function(inst) {
					return plugin.day(plugin._applyMonthsOffset(plugin.add(
						plugin.newDate(inst.drawDate), -inst.options.monthsToStep, 'm'), inst), 1); },
				action: function(inst) {
					plugin.changeMonth(this, -inst.options.monthsToStep); }
			},
			prevJump: {text: 'prevJumpText', status: 'prevJumpStatus', // Previous year
				keystroke: {keyCode: 33, ctrlKey: true}, // Ctrl + Page up
				enabled: function(inst) {
					var minDate = inst.curMinDate();
					return (!minDate || plugin.add(plugin.day(
						plugin._applyMonthsOffset(plugin.add(plugin.newDate(inst.drawDate),
						1 - inst.options.monthsToJump, 'm'), inst), 1), -1, 'd').
						getTime() >= minDate.getTime()); },
				date: function(inst) {
					return plugin.day(plugin._applyMonthsOffset(plugin.add(
						plugin.newDate(inst.drawDate), -inst.options.monthsToJump, 'm'), inst), 1); },
				action: function(inst) {
					plugin.changeMonth(this, -inst.options.monthsToJump); }
			},
			next: {text: 'nextText', status: 'nextStatus', // Next month
				keystroke: {keyCode: 34}, // Page down
				enabled: function(inst) {
					var maxDate = inst.get('maxDate');
					return (!maxDate || plugin.day(plugin._applyMonthsOffset(plugin.add(
						plugin.newDate(inst.drawDate), inst.options.monthsToStep, 'm'), inst), 1).
						getTime() <= maxDate.getTime()); },
				date: function(inst) {
					return plugin.day(plugin._applyMonthsOffset(plugin.add(
						plugin.newDate(inst.drawDate), inst.options.monthsToStep, 'm'), inst), 1); },
				action: function(inst) {
					plugin.changeMonth(this, inst.options.monthsToStep); }
			},
			nextJump: {text: 'nextJumpText', status: 'nextJumpStatus', // Next year
				keystroke: {keyCode: 34, ctrlKey: true}, // Ctrl + Page down
				enabled: function(inst) {
					var maxDate = inst.get('maxDate');
					return (!maxDate || plugin.day(plugin._applyMonthsOffset(plugin.add(
						plugin.newDate(inst.drawDate), inst.options.monthsToJump, 'm'), inst), 1).
						getTime() <= maxDate.getTime()); },
				date: function(inst) {
					return plugin.day(plugin._applyMonthsOffset(plugin.add(
						plugin.newDate(inst.drawDate), inst.options.monthsToJump, 'm'), inst), 1); },
				action: function(inst) {
					plugin.changeMonth(this, inst.options.monthsToJump); }
			},
			current: {text: 'currentText', status: 'currentStatus', // Current month
				keystroke: {keyCode: 36, ctrlKey: true}, // Ctrl + Home
				enabled: function(inst) {
					var minDate = inst.curMinDate();
					var maxDate = inst.get('maxDate');
					var curDate = inst.selectedDates[0] || plugin.today();
					return (!minDate || curDate.getTime() >= minDate.getTime()) &&
						(!maxDate || curDate.getTime() <= maxDate.getTime()); },
				date: function(inst) {
					return inst.selectedDates[0] || plugin.today(); },
				action: function(inst) {
					var curDate = inst.selectedDates[0] || plugin.today();
					plugin.showMonth(this, curDate.getFullYear(), curDate.getMonth() + 1); }
			},
			today: {text: 'todayText', status: 'todayStatus', // Today's month
				keystroke: {keyCode: 36, ctrlKey: true}, // Ctrl + Home
				enabled: function(inst) {
					var minDate = inst.curMinDate();
					var maxDate = inst.get('maxDate');
					return (!minDate || plugin.today().getTime() >= minDate.getTime()) &&
						(!maxDate || plugin.today().getTime() <= maxDate.getTime()); },
				date: function(inst) { return plugin.today(); },
				action: function(inst) { plugin.showMonth(this); }
			},
			clear: {text: 'clearText', status: 'clearStatus', // Clear the datepicker
				keystroke: {keyCode: 35, ctrlKey: true}, // Ctrl + End
				enabled: function(inst) { return true; },
				date: function(inst) { return null; },
				action: function(inst) { plugin.clear(this); }
			},
			close: {text: 'closeText', status: 'closeStatus', // Close the datepicker
				keystroke: {keyCode: 27}, // Escape
				enabled: function(inst) { return true; },
				date: function(inst) { return null; },
				action: function(inst) { plugin.hide(this); }
			},
			prevWeek: {text: 'prevWeekText', status: 'prevWeekStatus', // Previous week
				keystroke: {keyCode: 38, ctrlKey: true}, // Ctrl + Up
				enabled: function(inst) {
					var minDate = inst.curMinDate();
					return (!minDate || plugin.add(plugin.newDate(inst.drawDate), -7, 'd').
						getTime() >= minDate.getTime()); },
				date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), -7, 'd'); },
				action: function(inst) { plugin.changeDay(this, -7); }
			},
			prevDay: {text: 'prevDayText', status: 'prevDayStatus', // Previous day
				keystroke: {keyCode: 37, ctrlKey: true}, // Ctrl + Left
				enabled: function(inst) {
					var minDate = inst.curMinDate();
					return (!minDate || plugin.add(plugin.newDate(inst.drawDate), -1, 'd').
						getTime() >= minDate.getTime()); },
				date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), -1, 'd'); },
				action: function(inst) { plugin.changeDay(this, -1); }
			},
			nextDay: {text: 'nextDayText', status: 'nextDayStatus', // Next day
				keystroke: {keyCode: 39, ctrlKey: true}, // Ctrl + Right
				enabled: function(inst) {
					var maxDate = inst.get('maxDate');
					return (!maxDate || plugin.add(plugin.newDate(inst.drawDate), 1, 'd').
						getTime() <= maxDate.getTime()); },
				date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), 1, 'd'); },
				action: function(inst) { plugin.changeDay(this, 1); }
			},
			nextWeek: {text: 'nextWeekText', status: 'nextWeekStatus', // Next week
				keystroke: {keyCode: 40, ctrlKey: true}, // Ctrl + Down
				enabled: function(inst) {
					var maxDate = inst.get('maxDate');
					return (!maxDate || plugin.add(plugin.newDate(inst.drawDate), 7, 'd').
						getTime() <= maxDate.getTime()); },
				date: function(inst) { return plugin.add(plugin.newDate(inst.drawDate), 7, 'd'); },
				action: function(inst) { plugin.changeDay(this, 7); }
			}
		},

		/** Determine whether a command is enabled.
			@callback DatepickCommandEnabled
			@param inst {object} The current instance settings.
			@return {boolean} <code>true</code> if this command is enabled, <code>false</code> if not.
			@example enabled: function(inst) {
	return !!inst.curMinDate();
 } */

		/** Calculate the representative date for a command.
			@callback DatepickCommandDate
			@param inst {object} The current instance settings.
			@return {Date} A date appropriate for this command.
			@example date: function(inst) {
	return inst.curMinDate();
 } */

		/** Perform the action for a command.
			@callback DatepickCommandAction
			@param inst {object} The current instance settings.
			@example date: function(inst) {
	$.datepick.setDate(inst.elem, inst.curMinDate());
 } */

		/** Calculate the week of the year for a date.
			@callback DatepickCalculateWeek
			@param date {Date} The date to evaluate.
			@return {number} The week of the year.
			@example calculateWeek: function(date) {
	return Math.floor(($.datepick.dayOfYear(date) - 1) / 7) + 1;
 } */

		/** Provide information about an individual date shown in the calendar.
			@callback DatepickOnDate
			@param date {Date} The date to evaluate.
			@return {object} Information about that date, with the properties above.
			@property selectable {boolean} <code>true</code> if this date can be selected.
			@property dateClass {string} Class(es) to be applied to the date.
			@property content {string} The date cell content.
			@property tooltip {string} A popup tooltip for the date.
			@example onDate: function(date) {
	return {selectable: date.getDay() > 0 && date.getDay() &lt; 5,
		dateClass: date.getDay() == 4 ? 'last-day' : ''};
 } */

		/** Update the datepicker display.
			@callback DatepickOnShow
			@param picker {jQuery} The datepicker <code>div</code> to be shown.
			@param inst {object} The current instance settings.
			@example onShow: function(picker, inst) {
	picker.append('&lt;button type="button">Hi&lt;/button>').
		find('button:last').click(function() {
			alert('Hi!');
		});
 } */

		/** React to navigating through the months/years.
			@callback DatepickOnChangeMonthYear
			@param year {number} The new year.
			@param month {number} The new month (1 to 12).
			@example onChangeMonthYear: function(year, month) {
	alert('Now in ' + month + '/' + year);
 } */
			
		/** Datepicker on select callback.
			Triggered when a date is selected.
			@callback DatepickOnSelect
			@param dates {Date[]} The selected date(s).
			@example onSelect: function(dates) {
 	alert('Selected ' + dates);
 } */
			
		/** Datepicker on close callback.
			Triggered when a popup calendar is closed.
			@callback DatepickOnClose
			@param dates {Date[]} The selected date(s).
			@example onClose: function(dates) {
 	alert('Selected ' + dates);
 } */
			
		/** Default settings for the plugin.
			@property [pickerClass=''] {string} CSS class to add to this instance of the datepicker.
			@property [showOnFocus=true] {boolean} <code>true</code> for popup on focus, <code>false</code> for not.
			@property [showTrigger=null] {string|Element|jQuery} Element to be cloned for a trigger, <code>null</code> for none.
			@property [showAnim='show'] {string} Name of jQuery animation for popup, '' for no animation.
			@property [showOptions=null] {object} Options for enhanced animations.
			@property [showSpeed='normal'] {string} Duration of display/closure.
			@property [popupContainer=null] {string|Element|jQuery} The element to which a popup calendar is added, <code>null</code> for body.
			@property [alignment='bottom'] {string} Alignment of popup - with nominated corner of input:
						'top' or 'bottom' aligns depending on language direction,
						'topLeft', 'topRight', 'bottomLeft', 'bottomRight'.
			@property [fixedWeeks=false] {boolean} <code>true</code> to always show 6 weeks, <code>false</code> to only show as many as are needed.
			@property [firstDay=0] {number} First day of the week, 0 = Sunday, 1 = Monday, etc.
			@property [calculateWeek=this.iso8601Week] {DatepickCalculateWeek} Calculate week of the year from a date, <code>null</code> for ISO8601.
			@property [monthsToShow=1] {number|number[]} How many months to show, cols or [rows, cols].
			@property [monthsOffset=0] {number} How many months to offset the primary month by;
						may be a function that takes the date and returns the offset.
			@property [monthsToStep=1] {number} How many months to move when prev/next clicked.
			@property [monthsToJump=12] {number} How many months to move when large prev/next clicked.
			@property [useMouseWheel=true] {boolean} <code>true</code> to use mousewheel if available, <code>false</code> to never use it.
			@property [changeMonth=true] {boolean} <code>true</code> to change month/year via drop-down, <code>false</code> for navigation only.
			@property [yearRange='c-10:c+10'] {string} Range of years to show in drop-down: 'any' for direct text entry
						or 'start:end', where start/end are '+-nn' for relative to today
						or 'c+-nn' for relative to the currently selected date
						or 'nnnn' for an absolute year.
			@property [shortYearCutoff='+10'] {string} Cutoff for two-digit year in the current century.
			@property [showOtherMonths=false] {boolean} <code>true</code> to show dates from other months, <code>false</code> to not show them.
			@property [selectOtherMonths=false] {boolean} <code>true</code> to allow selection of dates from other months too.
			@property [defaultDate=null] {string|number|Date} Date to show if no other selected.
			@property [selectDefaultDate=false] {boolean} <code>true</code> to pre-select the default date if no other is chosen.
			@property [minDate=null] {string|number|Date} The minimum selectable date.
			@property [maxDate=null] {string|number|Date} The maximum selectable date.
			@property [dateFormat='mm/dd/yyyy'] {string} Format for dates.
			@property [autoSize=false] {boolean} <code>true</code> to size the input field according to the date format.
			@property [rangeSelect=false] {boolean} Allows for selecting a date range on one date picker.
			@property [rangeSeparator=' - '] {string} Text between two dates in a range.
			@property [multiSelect=0] {number} Maximum number of selectable dates, zero for single select.
			@property [multiSeparator=','] {string} Text between multiple dates.
			@property [onDate=null] {DatepickOnDate} Callback as a date is added to the datepicker.
			@property [onShow=null] {DatepickOnShow} Callback just before a datepicker is shown.
			@property [onChangeMonthYear=null] {DatepickOnChangeMonthYear} Callback when a new month/year is selected.
			@property [onSelect=null] {DatepickOnSelect} Callback when a date is selected.
			@property [onClose=null] {DatepickOnClose} Callback when a datepicker is closed.
			@property [altField=null] {string|Element|jQuery} Alternate field to update in synch with the datepicker.
			@property [altFormat=null] {string} Date format for alternate field, defaults to <code>dateFormat</code>.
			@property [constrainInput=true] {boolean} <code>true</code> to constrain typed input to <code>dateFormat</code> allowed characters.
			@property [commandsAsDateFormat=false] {boolean} <code>true</code> to apply
						<code><a href="#formatDate">formatDate</a></code> to the command texts.
			@property [commands=this.commands] {object} Command actions that may be added to a layout by name. */
		defaultOptions: {
			pickerClass: '',
			showOnFocus: true,
			showTrigger: null,
			showAnim: 'show',
			showOptions: {},
			showSpeed: 'normal',
			popupContainer: null,
			alignment: 'bottom',
			fixedWeeks: false,
			firstDay: 0,
			calculateWeek: null, // this.iso8601Week,
			monthsToShow: 1,
			monthsOffset: 0,
			monthsToStep: 1,
			monthsToJump: 12,
			useMouseWheel: true,
			changeMonth: true,
			yearRange: 'c-10:c+10',
			shortYearCutoff: '+10',
			showOtherMonths: false,
			selectOtherMonths: false,
			defaultDate: null,
			selectDefaultDate: false,
			minDate: null,
			maxDate: null,
			dateFormat: 'mm/dd/yyyy',
			autoSize: false,
			rangeSelect: false,
			rangeSeparator: ' - ',
			multiSelect: 0,
			multiSeparator: ',',
			onDate: null,
			onShow: null,
			onChangeMonthYear: null,
			onSelect: null,
			onClose: null,
			altField: null,
			altFormat: null,
			constrainInput: true,
			commandsAsDateFormat: false,
			commands: {} // this.commands
		},

		/** Localisations for the plugin.
			Entries are objects indexed by the language code ('' being the default US/English).
			Each object has the following attributes.
			@property [monthNames=['January','February','March','April','May','June','July','August','September','October','November','December']]
						The long names of the months.
			@property [monthNamesShort=['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec']]
						The short names of the months.
			@property [dayNames=['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday']]
						The long names of the days of the week.
			@property [dayNamesShort=['Sun','Mon','Tue','Wed','Thu','Fri','Sat']] The short names of the days of the week.
			@property [dayNamesMin=['Su','Mo','Tu','We','Th','Fr','Sa']] The minimal names of the days of the week.
			@property [dateFormat='mm/dd/yyyy'] {string} See options on <code><a href="#formatDate">formatDate</a></code>.
			@property [firstDay=0] {number} The first day of the week, Sun = 0, Mon = 1, etc.
			@property [renderer=this.defaultRenderer] {string} The rendering templates.
			@property [prevText='&lt;Prev'] {string} Text for the previous month command.
			@property [prevStatus='Show the previous month'] {string} Status text for the previous month command.
			@property [prevJumpText='&lt;&lt;'] {string} Text for the previous year command.
			@property [prevJumpStatus='Show the previous year'] {string} Status text for the previous year command.
			@property [nextText='Next&gt;'] {string} Text for the next month command.
			@property [nextStatus='Show the next month'] {string} Status text for the next month command.
			@property [nextJumpText='&gt;&gt;'] {string} Text for the next year command.
			@property [nextJumpStatus='Show the next year'] {string} Status text for the next year command.
			@property [currentText='Current'] {string} Text for the current month command.
			@property [currentStatus='Show the current month'] {string} Status text for the current month command.
			@property [todayText='Today'] {string} Text for the today's month command.
			@property [todayStatus='Show today\'s month'] {string} Status text for the today's month command.
			@property [clearText='Clear'] {string} Text for the clear command.
			@property [clearStatus='Clear all the dates'] {string} Status text for the clear command.
			@property [closeText='Close'] {string} Text for the close command.
			@property [closeStatus='Close the datepicker'] {string} Status text for the close command.
			@property [yearStatus='Change the year'] {string} Status text for year selection.
			@property [monthStatus='Change the month'] {string} Status text for month selection.
			@property [weekText='Wk'] {string} Text for week of the year column header.
			@property [weekStatus='Week of the year'] {string} Status text for week of the year column header.
			@property [dayStatus='Select DD,&nbsp;M&nbsp;d,&nbsp;yyyy'] {string} Status text for selectable days.
			@property [defaultStatus='Select a date'] {string} Status text shown by default.
			@property [isRTL=false] {boolean} <code>true</code> if language is right-to-left. */
		regionalOptions: { // Available regional settings, indexed by language/country code
			'': { // Default regional settings - English/US
				monthNames: ['January', 'February', 'March', 'April', 'May', 'June',
				'July', 'August', 'September', 'October', 'November', 'December'],
				monthNamesShort: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
				dayNames: ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'],
				dayNamesShort: ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'],
				dayNamesMin: ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'],
				dateFormat: 'mm/dd/yyyy',
				firstDay: 0,
				renderer: {}, // this.defaultRenderer
				prevText: '&lt;Prev',
				prevStatus: 'Show the previous month',
				prevJumpText: '&lt;&lt;',
				prevJumpStatus: 'Show the previous year',
				nextText: 'Next&gt;',
				nextStatus: 'Show the next month',
				nextJumpText: '&gt;&gt;',
				nextJumpStatus: 'Show the next year',
				currentText: 'Current',
				currentStatus: 'Show the current month',
				todayText: 'Today',
				todayStatus: 'Show today\'s month',
				clearText: 'Clear',
				clearStatus: 'Clear all the dates',
				closeText: 'Close',
				closeStatus: 'Close the datepicker',
				yearStatus: 'Change the year',
				monthStatus: 'Change the month',
				weekText: 'Wk',
				weekStatus: 'Week of the year',
				dayStatus: 'Select DD, M d, yyyy',
				defaultStatus: 'Select a date',
				isRTL: false
			}
		},
		
		/** Names of getter methods - those that can't be chained. */
		_getters: ['getDate', 'isDisabled', 'isSelectable', 'retrieveDate'],

		_disabled: [],
		
		_popupClass: pluginName + '-popup', // Marker for popup division
		_triggerClass: pluginName + '-trigger', // Marker for trigger element
		_disableClass: pluginName + '-disable', // Marker for disabled element
		_monthYearClass: pluginName + '-month-year', // Marker for month/year inputs
		_curMonthClass: pluginName + '-month-', // Marker for current month/year
		_anyYearClass: pluginName + '-any-year', // Marker for year direct input
		_curDoWClass: pluginName + '-dow-', // Marker for day of week

		_ticksTo1970: (((1970 - 1) * 365 + Math.floor(1970 / 4) - Math.floor(1970 / 100) +
			Math.floor(1970 / 400)) * 24 * 60 * 60 * 10000000),
		_msPerDay: 24 * 60 * 60 * 1000,

		/** The date format for use with Atom (RFC 3339/ISO 8601). */
		ATOM: 'yyyy-mm-dd',
		/** The date format for use with cookies. */
		COOKIE: 'D, dd M yyyy',
		/** The date format for full display. */
		FULL: 'DD, MM d, yyyy',
		/** The date format for use with ISO 8601. */
		ISO_8601: 'yyyy-mm-dd',
		/** The date format for Julian dates. */
		JULIAN: 'J',
		/** The date format for use with RFC 822. */
		RFC_822: 'D, d M yy',
		/** The date format for use with RFC 850. */
		RFC_850: 'DD, dd-M-yy',
		/** The date format for use with RFC 1036. */
		RFC_1036: 'D, d M yy',
		/** The date format for use with RFC 1123. */
		RFC_1123: 'D, d M yyyy',
		/** The date format for use with RFC 2822. */
		RFC_2822: 'D, d M yyyy',
		/** The date format for use with RSS (RFC 822). */
		RSS: 'D, d M yy',
		/** The date format for Windows ticks. */
		TICKS: '!',
		/** The date format for Unix timestamp. */
		TIMESTAMP: '@',
		/** The date format for use with W3C (ISO 8601). */
		W3C: 'yyyy-mm-dd',

		/** Format a date object into a string value.
			The format can be combinations of the following:
			<ul>
			<li>d  - day of month (no leading zero)</li>
			<li>dd - day of month (two digit)</li>
			<li>o  - day of year (no leading zeros)</li>
			<li>oo - day of year (three digit)</li>
			<li>D  - day name short</li>
			<li>DD - day name long</li>
			<li>w  - week of year (no leading zero)</li>
			<li>ww - week of year (two digit)</li>
			<li>m  - month of year (no leading zero)</li>
			<li>mm - month of year (two digit)</li>
			<li>M  - month name short</li>
			<li>MM - month name long</li>
			<li>yy - year (two digit)</li>
			<li>yyyy - year (four digit)</li>
			<li>@  - Unix timestamp (s since 01/01/1970)</li>
			<li>!  - Windows ticks (100ns since 01/01/0001)</li>
			<li>'...' - literal text</li>
			<li>'' - single quote</li>
			</ul>
			@param [format=dateFormat] {string} The desired format of the date.
			@param date {Date} The date value to format.
			@param [settings] {object} With the properties shown below.
			@property [dayNamesShort] {string[]} Abbreviated names of the days from Sunday.
			@property [dayNames] {string[]} Names of the days from Sunday.
			@property [monthNamesShort] {string[]} Abbreviated names of the months.
			@property [monthNames] {string[]} Names of the months.
			@property [calculateWeek] {DatepickCalculateWeek} Function that determines week of the year.
			@return {string} The date in the above format.
			@example var display = $.datepick.formatDate('yyyy-mm-dd', new Date(2014, 12-1, 25)) */
		formatDate: function(format, date, settings) {
			if (typeof format !== 'string') {
				settings = date;
				date = format;
				format = '';
			}
			if (!date) {
				return '';
			}
			format = format || this.defaultOptions.dateFormat;
			settings = settings || {};
			var dayNamesShort = settings.dayNamesShort || this.defaultOptions.dayNamesShort;
			var dayNames = settings.dayNames || this.defaultOptions.dayNames;
			var monthNamesShort = settings.monthNamesShort || this.defaultOptions.monthNamesShort;
			var monthNames = settings.monthNames || this.defaultOptions.monthNames;
			var calculateWeek = settings.calculateWeek || this.defaultOptions.calculateWeek;
			// Check whether a format character is doubled
			var doubled = function(match, step) {
				var matches = 1;
				while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
					matches++;
				}
				iFormat += matches - 1;
				return Math.floor(matches / (step || 1)) > 1;
			};
			// Format a number, with leading zeroes if necessary
			var formatNumber = function(match, value, len, step) {
				var num = '' + value;
				if (doubled(match, step)) {
					while (num.length < len) {
						num = '0' + num;
					}
				}
				return num;
			};
			// Format a name, short or long as requested
			var formatName = function(match, value, shortNames, longNames) {
				return (doubled(match) ? longNames[value] : shortNames[value]);
			};
			var output = '';
			var literal = false;
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !doubled("'")) {
						literal = false;
					}
					else {
						output += format.charAt(iFormat);
					}
				}
				else {
					switch (format.charAt(iFormat)) {
						case 'd': output += formatNumber('d', date.getDate(), 2); break;
						case 'D': output += formatName('D', date.getDay(),
							dayNamesShort, dayNames); break;
						case 'o': output += formatNumber('o', this.dayOfYear(date), 3); break;
						case 'w': output += formatNumber('w', calculateWeek(date), 2); break;
						case 'm': output += formatNumber('m', date.getMonth() + 1, 2); break;
						case 'M': output += formatName('M', date.getMonth(),
							monthNamesShort, monthNames); break;
						case 'y':
							output += (doubled('y', 2) ? date.getFullYear() :
								(date.getFullYear() % 100 < 10 ? '0' : '') + date.getFullYear() % 100);
							break;
						case '@': output += Math.floor(date.getTime() / 1000); break;
						case '!': output += date.getTime() * 10000 + this._ticksTo1970; break;
						case "'":
							if (doubled("'")) {
								output += "'";
							}
							else {
								literal = true;
							}
							break;
						default:
							output += format.charAt(iFormat);
					}
				}
			}
			return output;
		},

		/** Parse a string value into a date object.
			See <code><a href="#formatDate">formatDate</a></code> for the possible formats, plus:
			<ul>
			<li>* - ignore rest of string</li>
			</ul>
			@param format {string} The expected format of the date ('' for default datepicker format).
			@param value {string} The date in the above format.
			@param [settings] {object} With the properties shown above.
			@property [shortYearCutoff] {number} the cutoff year for determining the century.
			@property [dayNamesShort] {string[]} abbreviated names of the days from Sunday.
			@property [dayNames] {string[]} names of the days from Sunday.
			@property [monthNamesShort] {string[]} abbreviated names of the months.
			@property [monthNames] {string[]} names of the months.
			@return {Date} The extracted date value or <code>null</code> if value is blank.
			@throws Errors if the format and/or value are missing, if the value doesn't match the format,
					or if the date is invalid.
			@example var date = $.datepick.parseDate('dd/mm/yyyy', '25/12/2014') */
		parseDate: function(format, value, settings) {
			if (value == null) {
				throw 'Invalid arguments';
			}
			value = (typeof value === 'object' ? value.toString() : value + '');
			if (value === '') {
				return null;
			}
			format = format || this.defaultOptions.dateFormat;
			settings = settings || {};
			var shortYearCutoff = settings.shortYearCutoff || this.defaultOptions.shortYearCutoff;
			shortYearCutoff = (typeof shortYearCutoff !== 'string' ? shortYearCutoff :
				this.today().getFullYear() % 100 + parseInt(shortYearCutoff, 10));
			var dayNamesShort = settings.dayNamesShort || this.defaultOptions.dayNamesShort;
			var dayNames = settings.dayNames || this.defaultOptions.dayNames;
			var monthNamesShort = settings.monthNamesShort || this.defaultOptions.monthNamesShort;
			var monthNames = settings.monthNames || this.defaultOptions.monthNames;
			var year = -1;
			var month = -1;
			var day = -1;
			var doy = -1;
			var shortYear = false;
			var literal = false;
			// Check whether a format character is doubled
			var doubled = function(match, step) {
				var matches = 1;
				while (iFormat + matches < format.length && format.charAt(iFormat + matches) === match) {
					matches++;
				}
				iFormat += matches - 1;
				return Math.floor(matches / (step || 1)) > 1;
			};
			// Extract a number from the string value
			var getNumber = function(match, step) {
				var isDoubled = doubled(match, step);
				var size = [2, 3, isDoubled ? 4 : 2, 11, 20]['oy@!'.indexOf(match) + 1];
				var digits = new RegExp('^-?\\d{1,' + size + '}');
				var num = value.substring(iValue).match(digits);
				if (!num) {
					throw 'Missing number at position {0}'.replace(/\{0\}/, iValue);
				}
				iValue += num[0].length;
				return parseInt(num[0], 10);
			};
			// Extract a name from the string value and convert to an index
			var getName = function(match, shortNames, longNames, step) {
				var names = (doubled(match, step) ? longNames : shortNames);
				for (var i = 0; i < names.length; i++) {
					if (value.substr(iValue, names[i].length).toLowerCase() === names[i].toLowerCase()) {
						iValue += names[i].length;
						return i + 1;
					}
				}
				throw 'Unknown name at position {0}'.replace(/\{0\}/, iValue);
			};
			// Confirm that a literal character matches the string value
			var checkLiteral = function() {
				if (value.charAt(iValue) !== format.charAt(iFormat)) {
					throw 'Unexpected literal at position {0}'.replace(/\{0\}/, iValue);
				}
				iValue++;
			};
			var iValue = 0;
			for (var iFormat = 0; iFormat < format.length; iFormat++) {
				if (literal) {
					if (format.charAt(iFormat) === "'" && !doubled("'")) {
						literal = false;
					}
					else {
						checkLiteral();
					}
				}
				else {
					switch (format.charAt(iFormat)) {
						case 'd': day = getNumber('d'); break;
						case 'D': getName('D', dayNamesShort, dayNames); break;
						case 'o': doy = getNumber('o'); break;
						case 'w': getNumber('w'); break;
						case 'm': month = getNumber('m'); break;
						case 'M': month = getName('M', monthNamesShort, monthNames); break;
						case 'y':
							var iSave = iFormat;
							shortYear = !doubled('y', 2);
							iFormat = iSave;
							year = getNumber('y', 2);
							break;
						case '@':
							var date = this._normaliseDate(new Date(getNumber('@') * 1000));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case '!':
							var date = this._normaliseDate(
								new Date((getNumber('!') - this._ticksTo1970) / 10000));
							year = date.getFullYear();
							month = date.getMonth() + 1;
							day = date.getDate();
							break;
						case '*': iValue = value.length; break;
						case "'":
							if (doubled("'")) {
								checkLiteral();
							}
							else {
								literal = true;
							}
							break;
						default: checkLiteral();
					}
				}
			}
			if (iValue < value.length) {
				throw 'Additional text found at end';
			}
			if (year === -1) {
				year = this.today().getFullYear();
			}
			else if (year < 100 && shortYear) {
				year += (shortYearCutoff === -1 ? 1900 : this.today().getFullYear() -
					this.today().getFullYear() % 100 - (year <= shortYearCutoff ? 0 : 100));
			}
			if (doy > -1) {
				month = 1;
				day = doy;
				for (var dim = this.daysInMonth(year, month); day > dim;
						dim = this.daysInMonth(year, month)) {
					month++;
					day -= dim;
				}
			}
			var date = this.newDate(year, month, day);
			if (date.getFullYear() !== year || date.getMonth() + 1 !== month || date.getDate() !== day) {
				throw 'Invalid date';
			}
			return date;
		},

		/** A date may be specified as an exact value or a relative one.
			@param dateSpec {Date|number|string} The date as an object or string
					in the given format or an offset - numeric days from today,
					or string amounts and periods, e.g. '+1m +2w'.
			@param defaultDate {Date} The date to use if no other supplied, may be <code>null</code>.
			@param [currentDate] {Date} The current date as a possible basis for relative dates,
					if <code>null</code> today is used.
			@param dateFormat {string} The expected date format - see <code><a href="#formatDate">formatDate</a></code>.
			@param settings {object} With the properties shown above.
			@property [shortYearCutoff] {number} The cutoff year for determining the century.
			@property [dayNamesShort] {string[]} Abbreviated names of the days from Sunday.
			@property [dayNames] {string[]} Names of the days from Sunday.
			@property [monthNamesShort] {string[]} Abbreviated names of the months.
			@property [monthNames] {string[]} Names of the months.
			@return {Date} The decoded date.
			@example $.datepick.determineDate('+1m +2w', new Date()) */
		determineDate: function(dateSpec, defaultDate, currentDate, dateFormat, settings) {
			if (currentDate && typeof currentDate !== 'object') {
				settings = dateFormat;
				dateFormat = currentDate;
				currentDate = null;
			}
			if (typeof dateFormat !== 'string') {
				settings = dateFormat;
				dateFormat = '';
			}
			var offsetString = function(offset) {
				try {
					return plugin.parseDate(dateFormat, offset, settings);
				}
				catch (e) {
					// Ignore
				}
				offset = offset.toLowerCase();
				var date = (offset.match(/^c/) && currentDate ? plugin.newDate(currentDate) : null) ||
					plugin.today();
				var pattern = /([+-]?[0-9]+)\s*(d|w|m|y)?/g;
				var matches = null;
				while (matches = pattern.exec(offset)) {
					date = plugin.add(date, parseInt(matches[1], 10), matches[2] || 'd');
				}
				return date;
			};
			defaultDate = (defaultDate ? plugin.newDate(defaultDate) : null);
			dateSpec = (dateSpec == null ? defaultDate :
				(typeof dateSpec === 'string' ? offsetString(dateSpec) : (typeof dateSpec === 'number' ?
				(isNaN(dateSpec) || dateSpec === Infinity || dateSpec === -Infinity ? defaultDate :
				plugin.add(plugin.today(), dateSpec, 'd')) : plugin.newDate(dateSpec))));
			return dateSpec;
		},

		/** Find the number of days in a given month.
			@param year {Date|number} The date to get days for or the full year.
			@param month {number} The month (1 to 12).
			@return {number} The number of days in this month.
			@example var days = $.datepick.daysInMonth(2014, 12) */
		daysInMonth: function(year, month) {
			month = (year.getFullYear ? year.getMonth() + 1 : month);
			year = (year.getFullYear ? year.getFullYear() : year);
			return this.newDate(year, month + 1, 0).getDate();
		},

		/** Calculate the day of the year for a date.
			@param year {Date|number} The date to get the day-of-year for or the full year.
			@param month {number} The month (1-12).
			@param day {number} The day.
			@return {number} The day of the year.
			@example var doy = $.datepick.dayOfYear(2014, 12, 25) */
		dayOfYear: function(year, month, day) {
			var date = (year.getFullYear ? year : plugin.newDate(year, month, day));
			var newYear = plugin.newDate(date.getFullYear(), 1, 1);
			return Math.floor((date.getTime() - newYear.getTime()) / plugin._msPerDay) + 1;
		},

		/** Set as <code>calculateWeek</code> to determine the week of the year based on the ISO 8601 definition.
			@param year {Date|number} The date to get the week for or the full year.
			@param month {number} The month (1-12).
			@param day {number} The day.
			@return {number} The number of the week within the year that contains this date.
			@example var week = $.datepick.iso8601Week(2014, 12, 25) */
		iso8601Week: function(year, month, day) {
			var checkDate = (year.getFullYear ?
				new Date(year.getTime()) : plugin.newDate(year, month, day));
			// Find Thursday of this week starting on Monday
			checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
			var time = checkDate.getTime();
			checkDate.setMonth(0, 1); // Compare with Jan 1
			return Math.floor(Math.round((time - checkDate) / plugin._msPerDay) / 7) + 1;
		},

		/** Return today's date.
			@return {Date} Today.
			@example $.datepick.today() */
		today: function() {
			return this._normaliseDate(new Date());
		},

		/** Return a new date.
			@param year {Date|number} The date to clone or the year.
			@param month {number} The month (1-12).
			@param day {number} The day.
			@return {Date} The date.
			@example $.datepick.newDate(oldDate)
 $.datepick.newDate(2014, 12, 25) */
		newDate: function(year, month, day) {
			return (!year ? null : (year.getFullYear ? this._normaliseDate(new Date(year.getTime())) :
				new Date(year, month - 1, day, 12)));
		},

		/** Standardise a date into a common format - time portion is 12 noon.
			@private
			@param date {Date} The date to standardise.
			@return {Date} The normalised date. */
		_normaliseDate: function(date) {
			if (date) {
				date.setHours(12, 0, 0, 0);
			}
			return date;
		},

		/** Set the year for a date.
			@param date {Date} The original date.
			@param year {number} The new year.
			@return {Date} The updated date.
			@example $.datepick.year(date, 2014) */
		year: function(date, year) {
			date.setFullYear(year);
			return this._normaliseDate(date);
		},

		/** Set the month for a date.
			@param date  {Date} The original date.
			@param month {number} The new month (1-12).
			@return {Date} The updated date.
			@example $.datepick.month(date, 12) */
		month: function(date, month) {
			date.setMonth(month - 1);
			return this._normaliseDate(date);
		},

		/** Set the day for a date.
			@param date {Date} The original date.
			@param day {number} The new day of the month.
			@return {Date} The updated date.
			@example $.datepick.day(date, 25) */
		day: function(date, day) {
			date.setDate(day);
			return this._normaliseDate(date);
		},

		/** Add a number of periods to a date.
			@param date {Date} The original date.
			@param amount {number} The number of periods.
			@param period {string} The type of period d/w/m/y.
			@return {Date} The updated date.
			@example $.datepick.add(date, 10, 'd') */
		add: function(date, amount, period) {
			if (period === 'd' || period === 'w') {
				this._normaliseDate(date);
				date.setDate(date.getDate() + amount * (period === 'w' ? 7 : 1));
			}
			else {
				var year = date.getFullYear() + (period === 'y' ? amount : 0);
				var month = date.getMonth() + (period === 'm' ? amount : 0);
				date.setTime(plugin.newDate(year, month + 1,
					Math.min(date.getDate(), this.daysInMonth(year, month + 1))).getTime());
			}
			return date;
		},

		/** Apply the months offset value to a date.
			@private
			@param date {Date} The original date.
			@param inst {object} The current instance settings.
			@return {Date} The updated date. */
		_applyMonthsOffset: function(date, inst) {
			var monthsOffset = inst.options.monthsOffset;
			if ($.isFunction(monthsOffset)) {
				monthsOffset = monthsOffset.apply(inst.elem[0], [date]);
			}
			return plugin.add(date, -monthsOffset, 'm');
		},

		_init: function() {
			this.defaultOptions.commands = this.commands;
			this.defaultOptions.calculateWeek = this.iso8601Week;
			this.regionalOptions[''].renderer = this.defaultRenderer;
			this._super();
		},

		_instSettings: function(elem, options) {
			return {selectedDates: [], drawDate: null, pickingRange: false,
				inline: ($.inArray(elem[0].nodeName.toLowerCase(), ['div', 'span']) > -1),
				get: function(name) { // Get a setting value, computing if necessary
					if ($.inArray(name, ['defaultDate', 'minDate', 'maxDate']) > -1) { // Decode date settings
						return plugin.determineDate(this.options[name], null,
							this.selectedDates[0], this.options.dateFormat, this.getConfig());
					}
					return this.options[name];
				},
				curMinDate: function() {
					return (this.pickingRange ? this.selectedDates[0] : this.get('minDate'));
				},
				getConfig: function() {
					return {dayNamesShort: this.options.dayNamesShort, dayNames: this.options.dayNames,
						monthNamesShort: this.options.monthNamesShort, monthNames: this.options.monthNames,
						calculateWeek: this.options.calculateWeek,
						shortYearCutoff: this.options.shortYearCutoff};
				}
			};
		},

		_postAttach: function(elem, inst) {
			if (inst.inline) {
				inst.drawDate = plugin._checkMinMax(plugin.newDate(inst.selectedDates[0] ||
					inst.get('defaultDate') || plugin.today()), inst);
				inst.prevDate = plugin.newDate(inst.drawDate);
				this._update(elem[0]);
				if ($.fn.mousewheel) {
					elem.mousewheel(this._doMouseWheel);
				}
			}
			else {
				this._attachments(elem, inst);
				elem.on('keydown.' + inst.name, this._keyDown).on('keypress.' + inst.name, this._keyPress).
					on('keyup.' + inst.name, this._keyUp);
				if (elem.attr('disabled')) {
					this.disable(elem[0]);
				}
			}
		},

		_optionsChanged: function(elem, inst, options) {
			if (options.calendar && options.calendar !== inst.options.calendar) {
				var discardDate = function(name) {
					return (typeof inst.options[name] === 'object' ? null : inst.options[name]);
				};
				options = $.extend({defaultDate: discardDate('defaultDate'),
					minDate: discardDate('minDate'), maxDate: discardDate('maxDate')}, options);
				inst.selectedDates = [];
				inst.drawDate = null;
			}
			var dates = inst.selectedDates;
			$.extend(inst.options, options);
			this.setDate(elem[0], dates, null, false, true);
			inst.pickingRange = false;
			inst.drawDate = plugin.newDate(this._checkMinMax(
				(inst.options.defaultDate ? inst.get('defaultDate') : inst.drawDate) ||
				inst.get('defaultDate') || plugin.today(), inst));
			if (!inst.inline) {
				this._attachments(elem, inst);
			}
			if (inst.inline || inst.div) {
				this._update(elem[0]);
			}
		},

		/** Attach events and trigger, if necessary.
			@private
			@param elem {jQuery} The control to affect.
			@param inst {object} The current instance settings. */
		_attachments: function(elem, inst) {
			elem.off('focus.' + inst.name);
			if (inst.options.showOnFocus) {
				elem.on('focus.' + inst.name, this.show);
			}
			if (inst.trigger) {
				inst.trigger.remove();
			}
			var trigger = inst.options.showTrigger;
			inst.trigger = (!trigger ? $([]) :
				$(trigger).clone().removeAttr('id').addClass(this._triggerClass)
					[inst.options.isRTL ? 'insertBefore' : 'insertAfter'](elem).
					click(function() {
						if (!plugin.isDisabled(elem[0])) {
							plugin[plugin.curInst === inst ? 'hide' : 'show'](elem[0]);
						}
					}));
			this._autoSize(elem, inst);
			var dates = this._extractDates(inst, elem.val());
			if (dates) {
				this.setDate(elem[0], dates, null, true);
			}
			var defaultDate = inst.get('defaultDate');
			if (inst.options.selectDefaultDate && defaultDate && inst.selectedDates.length === 0) {
				this.setDate(elem[0], plugin.newDate(defaultDate || plugin.today()));
			}
		},

		/** Apply the maximum length for the date format.
			@private
			@param elem {jQuery} The control to affect.
			@param inst {object} The current instance settings. */
		_autoSize: function(elem, inst) {
			if (inst.options.autoSize && !inst.inline) {
				var date = plugin.newDate(2009, 10, 20); // Ensure double digits
				var dateFormat = inst.options.dateFormat;
				if (dateFormat.match(/[DM]/)) {
					var findMax = function(names) {
						var max = 0;
						var maxI = 0;
						for (var i = 0; i < names.length; i++) {
							if (names[i].length > max) {
								max = names[i].length;
								maxI = i;
							}
						}
						return maxI;
					};
					date.setMonth(findMax(inst.options[dateFormat.match(/MM/) ? // Longest month
						'monthNames' : 'monthNamesShort']));
					date.setDate(findMax(inst.options[dateFormat.match(/DD/) ? // Longest day
						'dayNames' : 'dayNamesShort']) + 20 - date.getDay());
				}
				inst.elem.attr('size', plugin.formatDate(dateFormat, date, inst.getConfig()).length);
			}
		},

		_preDestroy: function(elem, inst) {
			if (inst.trigger) {
				inst.trigger.remove();
			}
			elem.empty().off('.' + inst.name);
			if (inst.inline && $.fn.mousewheel) {
				elem.unmousewheel();
			}
			if (!inst.inline && inst.options.autoSize) {
				elem.removeAttr('size');
			}
		},

		/** Apply multiple event functions.
			@param fns {function} The functions to apply.
			@example onShow: multipleEvents(fn1, fn2, ...) */
		multipleEvents: function(fns) {
			var funcs = arguments;
			return function(args) {
				for (var i = 0; i < funcs.length; i++) {
					funcs[i].apply(this, arguments);
				}
			};
		},

		/** Enable the control.
			@param elem {Element} The control to affect.
			@example $(selector).datepick('enable') */
		enable: function(elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			var inst = this._getInst(elem);
			if (inst.inline) {
				elem.children('.' + this._disableClass).remove().end().
					find('button,select').prop('disabled', false).end().
					find('a').attr('href', 'javascript:void(0)');
			}
			else {
				elem.prop('disabled', false);
				inst.trigger.filter('button.' + this._triggerClass).prop('disabled', false).end().
					filter('img.' + this._triggerClass).css({opacity: '1.0', cursor: ''});
			}
			this._disabled = $.map(this._disabled,
				function(value) { return (value === elem[0] ? null : value); }); // Delete entry
		},

		/** Disable the control.
			@param elem {Element} The control to affect.
			@example $(selector).datepick('disable') */
		disable: function(elem) {
			elem = $(elem);
			if (!elem.hasClass(this._getMarker())) {
				return;
			}
			var inst = this._getInst(elem);
			if (inst.inline) {
				var inline = elem.children(':last');
				var offset = inline.offset();
				var relOffset = {left: 0, top: 0};
				inline.parents().each(function() {
					if ($(this).css('position') === 'relative') {
						relOffset = $(this).offset();
						return false;
					}
				});
				var zIndex = elem.css('zIndex');
				zIndex = (zIndex === 'auto' ? 0 : parseInt(zIndex, 10)) + 1;
				elem.prepend('<div class="' + this._disableClass + '" style="' +
					'width: ' + inline.outerWidth() + 'px; height: ' + inline.outerHeight() +
					'px; left: ' + (offset.left - relOffset.left) + 'px; top: ' +
					(offset.top - relOffset.top) + 'px; z-index: ' + zIndex + '"></div>').
					find('button,select').prop('disabled', true).end().
					find('a').removeAttr('href');
			}
			else {
				elem.prop('disabled', true);
				inst.trigger.filter('button.' + this._triggerClass).prop('disabled', true).end().
					filter('img.' + this._triggerClass).css({opacity: '0.5', cursor: 'default'});
			}
			this._disabled = $.map(this._disabled,
				function(value) { return (value === elem[0] ? null : value); }); // Delete entry
			this._disabled.push(elem[0]);
		},

		/** Is the first field in a jQuery collection disabled as a datepicker?
			@param elem {Element} The control to examine.
			@return {boolean} <code>true</code> if disabled, <code>false</code> if enabled.
			@example if ($(selector).datepick('isDisabled')) {...} */
		isDisabled: function(elem) {
			return (elem && $.inArray(elem, this._disabled) > -1);
		},

		/** Show a popup datepicker.
			@param elem {Event|Element} a focus event or the control to use.
			@example $(selector).datepick('show') */
		show: function(elem) {
			elem = $(elem.target || elem);
			var inst = plugin._getInst(elem);
			if (plugin.curInst === inst) {
				return;
			}
			if (plugin.curInst) {
				plugin.hide(plugin.curInst, true);
			}
			if (!$.isEmptyObject(inst)) {
				// Retrieve existing date(s)
				inst.lastVal = null;
				inst.selectedDates = plugin._extractDates(inst, elem.val());
				inst.pickingRange = false;
				inst.drawDate = plugin._checkMinMax(plugin.newDate(inst.selectedDates[0] ||
					inst.get('defaultDate') || plugin.today()), inst);
				inst.prevDate = plugin.newDate(inst.drawDate);
				plugin.curInst = inst;
				// Generate content
				plugin._update(elem[0], true);
				// Adjust position before showing
				var offset = plugin._checkOffset(inst);
				inst.div.css({left: offset.left, top: offset.top});
				// And display
				var showAnim = inst.options.showAnim;
				var showSpeed = inst.options.showSpeed;
				showSpeed = (showSpeed === 'normal' && $.ui &&
					parseInt($.ui.version.substring(2)) >= 8 ? '_default' : showSpeed);
				if ($.effects && ($.effects[showAnim] || ($.effects.effect && $.effects.effect[showAnim]))) {
					var data = inst.div.data(); // Update old effects data
					for (var key in data) {
						if (key.match(/^ec\.storage\./)) {
							data[key] = inst._mainDiv.css(key.replace(/ec\.storage\./, ''));
						}
					}
					inst.div.data(data).show(showAnim, inst.options.showOptions, showSpeed);
				}
				else {
					inst.div[showAnim || 'show'](showAnim ? showSpeed : 0);
				}
			}
		},

		/** Extract possible dates from a string.
			@private
			@param inst {object} The current instance settings.
			@param text {string} The text to extract from.
			@return {Date[]} The extracted dates. */
		_extractDates: function(inst, datesText) {
			if (datesText === inst.lastVal) {
				return;
			}
			inst.lastVal = datesText;
			datesText = datesText.split(inst.options.multiSelect ? inst.options.multiSeparator :
				(inst.options.rangeSelect ? inst.options.rangeSeparator : '\x00'));
			var dates = [];
			for (var i = 0; i < datesText.length; i++) {
				try {
					var date = plugin.parseDate(inst.options.dateFormat, datesText[i], inst.getConfig());
					if (date) {
						var found = false;
						for (var j = 0; j < dates.length; j++) {
							if (dates[j].getTime() === date.getTime()) {
								found = true;
								break;
							}
						}
						if (!found) {
							dates.push(date);
						}
					}
				}
				catch (e) {
					// Ignore
				}
			}
			dates.splice(inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1), dates.length);
			if (inst.options.rangeSelect && dates.length === 1) {
				dates[1] = dates[0];
			}
			return dates;
		},

		/** Update the datepicker display.
			@private
			@param elem {Event|Element} a focus event or the control to use.
			@param hidden {boolean} <code>true</code> to initially hide the datepicker. */
		_update: function(elem, hidden) {
			elem = $(elem.target || elem);
			var inst = plugin._getInst(elem);
			if (!$.isEmptyObject(inst)) {
				if (inst.inline || plugin.curInst === inst) {
					if ($.isFunction(inst.options.onChangeMonthYear) && (!inst.prevDate ||
							inst.prevDate.getFullYear() !== inst.drawDate.getFullYear() ||
							inst.prevDate.getMonth() !== inst.drawDate.getMonth())) {
						inst.options.onChangeMonthYear.apply(elem[0],
							[inst.drawDate.getFullYear(), inst.drawDate.getMonth() + 1]);
					}
				}
				if (inst.inline) {
					elem.html(this._generateContent(elem[0], inst));
				}
				else if (plugin.curInst === inst) {
					if (!inst.div) {
						inst.div = $('<div></div>').addClass(this._popupClass).
							css({display: (hidden ? 'none' : 'static'), position: 'absolute',
								left: elem.offset().left, top: elem.offset().top + elem.outerHeight()}).
							appendTo($(inst.options.popupContainer || 'body'));
						if ($.fn.mousewheel) {
							inst.div.mousewheel(this._doMouseWheel);
						}
					}
					inst.div.html(this._generateContent(elem[0], inst));
					elem.focus();
				}
			}
		},

		/** Update the input field and any alternate field with the current dates.
			@private
			@param elem {Element} The control to use.
			@param keyUp {boolean} <code>true</code> if coming from <code>keyUp</code> processing (internal). */
		_updateInput: function(elem, keyUp) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst)) {
				var value = '';
				var altValue = '';
				var sep = (inst.options.multiSelect ? inst.options.multiSeparator :
					inst.options.rangeSeparator);
				var altFormat = inst.options.altFormat || inst.options.dateFormat;
				for (var i = 0; i < inst.selectedDates.length; i++) {
					value += (keyUp ? '' : (i > 0 ? sep : '') + plugin.formatDate(
						inst.options.dateFormat, inst.selectedDates[i], inst.getConfig()));
					altValue += (i > 0 ? sep : '') + plugin.formatDate(
						altFormat, inst.selectedDates[i], inst.getConfig());
				}
				if (!inst.inline && !keyUp) {
					$(elem).val(value);
				}
				$(inst.options.altField).val(altValue);
				if ($.isFunction(inst.options.onSelect) && !keyUp && !inst.inSelect) {
					inst.inSelect = true; // Prevent endless loops
					inst.options.onSelect.apply(elem, [inst.selectedDates]);
					inst.inSelect = false;
				}
			}
		},

		/** Retrieve the size of left and top borders for an element.
			@private
			@param elem {jQuery} The element of interest.
			@return {number[]} The left and top borders. */
		_getBorders: function(elem) {
			var convert = function(value) {
				return {thin: 1, medium: 3, thick: 5}[value] || value;
			};
			return [parseFloat(convert(elem.css('border-left-width'))),
				parseFloat(convert(elem.css('border-top-width')))];
		},

		/** Check positioning to remain on the screen.
			@private
			@param inst {object} The current instance settings.
			@return {object} The updated offset for the datepicker. */
		_checkOffset: function(inst) {
			var base = (inst.elem.is(':hidden') && inst.trigger ? inst.trigger : inst.elem);
			var offset = base.offset();
			var browserWidth = $(window).width();
			var browserHeight = $(window).height();
			if (browserWidth === 0) {
				return offset;
			}
			var isFixed = false;
			$(inst.elem).parents().each(function() {
				isFixed |= $(this).css('position') === 'fixed';
				return !isFixed;
			});
			var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
			var scrollY = document.documentElement.scrollTop || document.body.scrollTop;
			var above = offset.top - (isFixed ? scrollY : 0) - inst.div.outerHeight();
			var below = offset.top - (isFixed ? scrollY : 0) + base.outerHeight();
			var alignL = offset.left - (isFixed ? scrollX : 0);
			var alignR = offset.left - (isFixed ? scrollX : 0) + base.outerWidth() - inst.div.outerWidth();
			var tooWide = (offset.left - scrollX + inst.div.outerWidth()) > browserWidth;
			var tooHigh = (offset.top - scrollY + inst.elem.outerHeight() +
				inst.div.outerHeight()) > browserHeight;
			inst.div.css('position', isFixed ? 'fixed' : 'absolute');
			var alignment = inst.options.alignment;
			if (alignment === 'topLeft') {
				offset = {left: alignL, top: above};
			}
			else if (alignment === 'topRight') {
				offset = {left: alignR, top: above};
			}
			else if (alignment === 'bottomLeft') {
				offset = {left: alignL, top: below};
			}
			else if (alignment === 'bottomRight') {
				offset = {left: alignR, top: below};
			}
			else if (alignment === 'top') {
				offset = {left: (inst.options.isRTL || tooWide ? alignR : alignL), top: above};
			}
			else { // bottom
				offset = {left: (inst.options.isRTL || tooWide ? alignR : alignL),
					top: (tooHigh ? above : below)};
			}
			offset.left = Math.max((isFixed ? 0 : scrollX), offset.left);
			offset.top = Math.max((isFixed ? 0 : scrollY), offset.top);
			return offset;
		},

		/** Close date picker if clicked elsewhere.
			@private
			@param event {MouseEvent} The mouse click to check. */
		_checkExternalClick: function(event) {
			if (!plugin.curInst) {
				return;
			}
			var elem = $(event.target);
			if (elem.closest('.' + plugin._popupClass + ',.' + plugin._triggerClass).length === 0 &&
					!elem.hasClass(plugin._getMarker())) {
				plugin.hide(plugin.curInst);
			}
		},

		/** Hide a popup datepicker.
			@param elem {Element|object} The control to use or the current instance settings.
			@param immediate {boolean} <code>true</code> to close immediately without animation (internal).
			@example $(selector).datepick('hide') */
		hide: function(elem, immediate) {
			if (!elem) {
				return;
			}
			var inst = this._getInst(elem);
			if ($.isEmptyObject(inst)) {
				inst = elem;
			}
			if (inst && inst === plugin.curInst) {
				var showAnim = (immediate ? '' : inst.options.showAnim);
				var showSpeed = inst.options.showSpeed;
				showSpeed = (showSpeed === 'normal' && $.ui &&
					parseInt($.ui.version.substring(2)) >= 8 ? '_default' : showSpeed);
				var postProcess = function() {
					if (!inst.div) {
						return;
					}
					inst.div.remove();
					inst.div = null;
					plugin.curInst = null;
					if ($.isFunction(inst.options.onClose)) {
						inst.options.onClose.apply(elem, [inst.selectedDates]);
					}
				};
				inst.div.stop();
				if ($.effects && ($.effects[showAnim] || ($.effects.effect && $.effects.effect[showAnim]))) {
					inst.div.hide(showAnim, inst.options.showOptions, showSpeed, postProcess);
				}
				else {
					var hideAnim = (showAnim === 'slideDown' ? 'slideUp' :
						(showAnim === 'fadeIn' ? 'fadeOut' : 'hide'));
					inst.div[hideAnim]((showAnim ? showSpeed : ''), postProcess);
				}
				if (!showAnim) {
					postProcess();
				}
			}
		},

		/** Handle keystrokes in the datepicker.
			@private
			@param event {KeyEvent} The keystroke.
			@return {boolean} <code>true</code> if not handled, <code>false</code> if handled. */
		_keyDown: function(event) {
			var elem = event.target;
			var inst = plugin._getInst(elem);
			var handled = false;
			if (inst.div) {
				if (event.keyCode === 9) { // Tab - close
					plugin.hide(elem);
				}
				else if (event.keyCode === 13) { // Enter - select
					plugin.selectDate(elem,
						$('a.' + inst.options.renderer.highlightedClass, inst.div)[0]);
					handled = true;
				}
				else { // Command keystrokes
					var commands = inst.options.commands;
					for (var name in commands) {
						var command = commands[name];
						if (command.keystroke.keyCode === event.keyCode &&
								!!command.keystroke.ctrlKey === !!(event.ctrlKey || event.metaKey) &&
								!!command.keystroke.altKey === event.altKey &&
								!!command.keystroke.shiftKey === event.shiftKey) {
							plugin.performAction(elem, name);
							handled = true;
							break;
						}
					}
				}
			}
			else { // Show on 'current' keystroke
				var command = inst.options.commands.current;
				if (command.keystroke.keyCode === event.keyCode &&
						!!command.keystroke.ctrlKey === !!(event.ctrlKey || event.metaKey) &&
						!!command.keystroke.altKey === event.altKey &&
						!!command.keystroke.shiftKey === event.shiftKey) {
					plugin.show(elem);
					handled = true;
				}
			}
			inst.ctrlKey = ((event.keyCode < 48 && event.keyCode !== 32) || event.ctrlKey || event.metaKey);
			if (handled) {
				event.preventDefault();
				event.stopPropagation();
			}
			return !handled;
		},

		/** Filter keystrokes in the datepicker.
			@private
			@param event {KeyEvent} The keystroke.
			@return {boolean} <code>true</code> if allowed, <code>false</code> if not allowed. */
		_keyPress: function(event) {
			var inst = plugin._getInst(event.target);
			if (!$.isEmptyObject(inst) && inst.options.constrainInput) {
				var ch = String.fromCharCode(event.keyCode || event.charCode);
				var allowedChars = plugin._allowedChars(inst);
				return (event.metaKey || inst.ctrlKey || ch < ' ' ||
					!allowedChars || allowedChars.indexOf(ch) > -1);
			}
			return true;
		},

		/** Determine the set of characters allowed by the date format.
			@private
			@param inst {object} The current instance settings.
			@return {string} The set of allowed characters, or <code>null</code> if anything allowed. */
		_allowedChars: function(inst) {
			var allowedChars = (inst.options.multiSelect ? inst.options.multiSeparator :
				(inst.options.rangeSelect ? inst.options.rangeSeparator : ''));
			var literal = false;
			var hasNum = false;
			var dateFormat = inst.options.dateFormat;
			for (var i = 0; i < dateFormat.length; i++) {
				var ch = dateFormat.charAt(i);
				if (literal) {
					if (ch === "'" && dateFormat.charAt(i + 1) !== "'") {
						literal = false;
					}
					else {
						allowedChars += ch;
					}
				}
				else {
					switch (ch) {
						case 'd': case 'm': case 'o': case 'w':
							allowedChars += (hasNum ? '' : '0123456789'); hasNum = true; break;
						case 'y': case '@': case '!':
							allowedChars += (hasNum ? '' : '0123456789') + '-'; hasNum = true; break;
						case 'J':
							allowedChars += (hasNum ? '' : '0123456789') + '-.'; hasNum = true; break;
						case 'D': case 'M': case 'Y':
							return null; // Accept anything
						case "'":
							if (dateFormat.charAt(i + 1) === "'") {
								allowedChars += "'";
							}
							else {
								literal = true;
							}
							break;
						default:
							allowedChars += ch;
					}
				}
			}
			return allowedChars;
		},

		/** Synchronise datepicker with the field.
			@private
			@param event {KeyEvent} The keystroke.
			@return {boolean} <code>true</code> if allowed, <code>false</code> if not allowed. */
		_keyUp: function(event) {
			var elem = event.target;
			var inst = plugin._getInst(elem);
			if (!$.isEmptyObject(inst) && !inst.ctrlKey && inst.lastVal !== inst.elem.val()) {
				try {
					var dates = plugin._extractDates(inst, inst.elem.val());
					if (dates.length > 0) {
						plugin.setDate(elem, dates, null, true);
					}
				}
				catch (event) {
					// Ignore
				}
			}
			return true;
		},

		/** Increment/decrement month/year on mouse wheel activity.
			@private
			@param event {event} The mouse wheel event.
			@param delta {number} The amount of change. */
		_doMouseWheel: function(event, delta) {
			var elem = (plugin.curInst && plugin.curInst.elem[0]) ||
				$(event.target).closest('.' + plugin._getMarker())[0];
			if (plugin.isDisabled(elem)) {
				return;
			}
			var inst = plugin._getInst(elem);
			if (inst.options.useMouseWheel) {
				delta = (delta < 0 ? -1 : +1);
				plugin.changeMonth(elem, -inst.options[event.ctrlKey ? 'monthsToJump' : 'monthsToStep'] * delta);
			}
			event.preventDefault();
		},

		/** Clear an input and close a popup datepicker.
			@param elem {Element} The control to use.
			@example $(selector).datepick('clear') */
		clear: function(elem) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst)) {
				inst.selectedDates = [];
				this.hide(elem);
				var defaultDate = inst.get('defaultDate');
				if (inst.options.selectDefaultDate && defaultDate) {
					this.setDate(elem, plugin.newDate(defaultDate || plugin.today()));
				}
				else {
					this._updateInput(elem);
				}
			}
		},

		/** Retrieve the selected date(s) for a datepicker.
			@param elem {Element} The control to examine.
			@return {Date[]} The selected date(s).
			@example var dates = $(selector).datepick('getDate') */
		getDate: function(elem) {
			var inst = this._getInst(elem);
			return (!$.isEmptyObject(inst) ? inst.selectedDates : []);
		},

		/** Set the selected date(s) for a datepicker.
			@param elem {Element} the control to examine.
			@param dates {Date|number|string|array} the selected date(s).
			@param [endDate] {Date|number|string} the ending date for a range.
			@param keyUp {boolean} <code>true</code> if coming from <code>keyUp</code> processing (internal).
			@param setOpt {boolean} <code>true</code> if coming from option processing (internal).
			@example $(selector).datepick('setDate', new Date(2014, 12-1, 25))
 $(selector).datepick('setDate', '12/25/2014', '01/01/2015')
 $(selector).datepick('setDate', [date1, date2, date3]) */
		setDate: function(elem, dates, endDate, keyUp, setOpt) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst)) {
				if (!$.isArray(dates)) {
					dates = [dates];
					if (endDate) {
						dates.push(endDate);
					}
				}
				var minDate = inst.get('minDate');
				var maxDate = inst.get('maxDate');
				var curDate = inst.selectedDates[0];
				inst.selectedDates = [];
				for (var i = 0; i < dates.length; i++) {
					var date = plugin.determineDate(
						dates[i], null, curDate, inst.options.dateFormat, inst.getConfig());
					if (date) {
						if ((!minDate || date.getTime() >= minDate.getTime()) &&
								(!maxDate || date.getTime() <= maxDate.getTime())) {
							var found = false;
							for (var j = 0; j < inst.selectedDates.length; j++) {
								if (inst.selectedDates[j].getTime() === date.getTime()) {
									found = true;
									break;
								}
							}
							if (!found) {
								inst.selectedDates.push(date);
							}
						}
					}
				}
				inst.selectedDates.splice(inst.options.multiSelect ||
					(inst.options.rangeSelect ? 2 : 1), inst.selectedDates.length);
				if (inst.options.rangeSelect) {
					switch (inst.selectedDates.length) {
						case 1: inst.selectedDates[1] = inst.selectedDates[0]; break;
						case 2: inst.selectedDates[1] =
							(inst.selectedDates[0].getTime() > inst.selectedDates[1].getTime() ?
							inst.selectedDates[0] : inst.selectedDates[1]); break;
					}
					inst.pickingRange = false;
				}
				inst.prevDate = (inst.drawDate ? plugin.newDate(inst.drawDate) : null);
				inst.drawDate = this._checkMinMax(plugin.newDate(inst.selectedDates[0] ||
					inst.get('defaultDate') || plugin.today()), inst);
				if (!setOpt) {
					this._update(elem);
					this._updateInput(elem, keyUp);
				}
			}
		},

		/** Determine whether a date is selectable for this datepicker.
			@private
			@param elem {Element} The control to check.
			@param date {Date|string|number} The date to check.
			@return {boolean} <code>true</code> if selectable, <code>false</code> if not.
			@example var selectable = $(selector).datepick('isSelectable', date) */
		isSelectable: function(elem, date) {
			var inst = this._getInst(elem);
			if ($.isEmptyObject(inst)) {
				return false;
			}
			date = plugin.determineDate(date, inst.selectedDates[0] || this.today(), null,
				inst.options.dateFormat, inst.getConfig());
			return this._isSelectable(elem, date, inst.options.onDate,
				inst.get('minDate'), inst.get('maxDate'));
		},

		/** Internally determine whether a date is selectable for this datepicker.
			@private
			@param elem {Element} the control to check.
			@param date {Date} The date to check.
			@param onDate {function|boolean} Any onDate callback or callback.selectable.
			@param minDate {Date} The minimum allowed date.
			@param maxDate {Date} The maximum allowed date.
			@return {boolean} <code>true</code> if selectable, <code>false</code> if not. */
		_isSelectable: function(elem, date, onDate, minDate, maxDate) {
			var dateInfo = (typeof onDate === 'boolean' ? {selectable: onDate} :
				(!$.isFunction(onDate) ? {} : onDate.apply(elem, [date, true])));
			return (dateInfo.selectable !== false) &&
				(!minDate || date.getTime() >= minDate.getTime()) &&
				(!maxDate || date.getTime() <= maxDate.getTime());
		},

		/** Perform a named action for a datepicker.
			@param elem {element} The control to affect.
			@param action {string} The name of the action. */
		performAction: function(elem, action) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst) && !this.isDisabled(elem)) {
				var commands = inst.options.commands;
				if (commands[action] && commands[action].enabled.apply(elem, [inst])) {
					commands[action].action.apply(elem, [inst]);
				}
			}
		},

		/** Set the currently shown month, defaulting to today's.
			@param elem {Element} The control to affect.
			@param [year] {number} The year to show.
			@param [month] {number} The month to show (1-12).
			@param [day] {number} The day to show.
			@example $(selector).datepick('showMonth', 2014, 12, 25) */
		showMonth: function(elem, year, month, day) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst) && (day != null ||
					(inst.drawDate.getFullYear() !== year || inst.drawDate.getMonth() + 1 !== month))) {
				inst.prevDate = plugin.newDate(inst.drawDate);
				var show = this._checkMinMax((year != null ?
					plugin.newDate(year, month, 1) : plugin.today()), inst);
				inst.drawDate = plugin.newDate(show.getFullYear(), show.getMonth() + 1, 
					(day != null ? day : Math.min(inst.drawDate.getDate(),
					plugin.daysInMonth(show.getFullYear(), show.getMonth() + 1))));
				this._update(elem);
			}
		},

		/** Adjust the currently shown month.
			@param elem {Element} The control to affect.
			@param offset {number} The number of months to change by.
			@example $(selector).datepick('changeMonth', 2)*/
		changeMonth: function(elem, offset) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst)) {
				var date = plugin.add(plugin.newDate(inst.drawDate), offset, 'm');
				this.showMonth(elem, date.getFullYear(), date.getMonth() + 1);
			}
		},

		/** Adjust the currently shown day.
			@param elem {Element} The control to affect.
			@param offset {number} The number of days to change by.
			@example $(selector).datepick('changeDay', 7)*/
		changeDay: function(elem, offset) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst)) {
				var date = plugin.add(plugin.newDate(inst.drawDate), offset, 'd');
				this.showMonth(elem, date.getFullYear(), date.getMonth() + 1, date.getDate());
			}
		},

		/** Restrict a date to the minimum/maximum specified.
			@private
			@param date {Date} The date to check.
			@param inst {object} The current instance settings. */
		_checkMinMax: function(date, inst) {
			var minDate = inst.get('minDate');
			var maxDate = inst.get('maxDate');
			date = (minDate && date.getTime() < minDate.getTime() ? plugin.newDate(minDate) : date);
			date = (maxDate && date.getTime() > maxDate.getTime() ? plugin.newDate(maxDate) : date);
			return date;
		},

		/** Retrieve the date associated with an entry in the datepicker.
			@param elem {Element} The control to examine.
			@param target {Element} The selected datepicker element.
			@return {Date} The corresponding date, or <code>null</code>.			
			@example var date = $(selector).datepick('retrieveDate', $('div.datepick-popup a:contains(10)')[0]) */
		retrieveDate: function(elem, target) {
			var inst = this._getInst(elem);
			return ($.isEmptyObject(inst) ? null : this._normaliseDate(
				new Date(parseInt(target.className.replace(/^.*dp(-?\d+).*$/, '$1'), 10))));
		},

		/** Select a date for this datepicker.
			@param elem {Element} The control to examine.
			@param target {Element} The selected datepicker element.
			@example $(selector).datepick('selectDate', $('div.datepick-popup a:contains(10)')[0]) */
		selectDate: function(elem, target) {
			var inst = this._getInst(elem);
			if (!$.isEmptyObject(inst) && !this.isDisabled(elem)) {
				var date = this.retrieveDate(elem, target);
				if (inst.options.multiSelect) {
					var found = false;
					for (var i = 0; i < inst.selectedDates.length; i++) {
						if (date.getTime() === inst.selectedDates[i].getTime()) {
							inst.selectedDates.splice(i, 1);
							found = true;
							break;
						}
					}
					if (!found && inst.selectedDates.length < inst.options.multiSelect) {
						inst.selectedDates.push(date);
					}
				}
				else if (inst.options.rangeSelect) {
					if (inst.pickingRange) {
						inst.selectedDates[1] = date;
					}
					else {
						inst.selectedDates = [date, date];
					}
					inst.pickingRange = !inst.pickingRange;
				}
				else {
					inst.selectedDates = [date];
				}
				inst.prevDate = plugin.newDate(date);
				this._updateInput(elem);
				if (inst.inline || inst.pickingRange || inst.selectedDates.length <
						(inst.options.multiSelect || (inst.options.rangeSelect ? 2 : 1))) {
					this._update(elem);
				}
				else {
					this.hide(elem);
				}
			}
		},

		/** Generate the datepicker content for this control.
			@private
			@param elem {Element} The control to affect.
			@param inst {object} The current instance settings.
			@return {jQuery} The datepicker content */
		_generateContent: function(elem, inst) {
			var monthsToShow = inst.options.monthsToShow;
			monthsToShow = ($.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow]);
			inst.drawDate = this._checkMinMax(
				inst.drawDate || inst.get('defaultDate') || plugin.today(), inst);
			var drawDate = plugin._applyMonthsOffset(plugin.newDate(inst.drawDate), inst);
			// Generate months
			var monthRows = '';
			for (var row = 0; row < monthsToShow[0]; row++) {
				var months = '';
				for (var col = 0; col < monthsToShow[1]; col++) {
					months += this._generateMonth(elem, inst, drawDate.getFullYear(),
						drawDate.getMonth() + 1, inst.options.renderer, (row === 0 && col === 0));
					plugin.add(drawDate, 1, 'm');
				}
				monthRows += this._prepare(inst.options.renderer.monthRow, inst).replace(/\{months\}/, months);
			}
			var picker = this._prepare(inst.options.renderer.picker, inst).replace(/\{months\}/, monthRows).
				replace(/\{weekHeader\}/g, this._generateDayHeaders(inst, inst.options.renderer));
			// Add commands
			var addCommand = function(type, open, close, name, classes) {
				if (picker.indexOf('{' + type + ':' + name + '}') === -1) {
					return;
				}
				var command = inst.options.commands[name];
				var date = (inst.options.commandsAsDateFormat ? command.date.apply(elem, [inst]) : null);
				picker = picker.replace(new RegExp('\\{' + type + ':' + name + '\\}', 'g'),
					'<' + open + (command.status ? ' title="' + inst.options[command.status] + '"' : '') +
					' class="' + inst.options.renderer.commandClass + ' ' +
					inst.options.renderer.commandClass + '-' + name + ' ' + classes +
					(command.enabled(inst) ? '' : ' ' + inst.options.renderer.disabledClass) + '">' +
					(date ? plugin.formatDate(inst.options[command.text], date, inst.getConfig()) :
					inst.options[command.text]) + '</' + close + '>');
			};
			for (var name in inst.options.commands) {
				addCommand('button', 'button type="button"', 'button', name,
					inst.options.renderer.commandButtonClass);
				addCommand('link', 'a href="javascript:void(0)"', 'a', name,
					inst.options.renderer.commandLinkClass);
			}
			picker = $(picker);
			if (monthsToShow[1] > 1) {
				var count = 0;
				$(inst.options.renderer.monthSelector, picker).each(function() {
					var nth = ++count % monthsToShow[1];
					$(this).addClass(nth === 1 ? 'first' : (nth === 0 ? 'last' : ''));
				});
			}
			// Add datepicker behaviour
			var self = this;
			picker.find(inst.options.renderer.daySelector + ' a').hover(
					function() { $(this).addClass(inst.options.renderer.highlightedClass); },
					function() {
						(inst.inline ? $(this).closest('.' + self._getMarker()) : inst.div).
							find(inst.options.renderer.daySelector + ' a').
							removeClass(inst.options.renderer.highlightedClass);
					}).
				click(function() {
					self.selectDate(elem, this);
				}).end().
				find('select.' + this._monthYearClass + ':not(.' + this._anyYearClass + ')').
				change(function() {
					var monthYear = $(this).val().split('/');
					self.showMonth(elem, parseInt(monthYear[1], 10), parseInt(monthYear[0], 10));
				}).end().
				find('select.' + this._anyYearClass).click(function() {
					$(this).css('visibility', 'hidden').
						next('input').css({left: this.offsetLeft, top: this.offsetTop,
						width: this.offsetWidth, height: this.offsetHeight}).show().focus();
				}).end().
				find('input.' + self._monthYearClass).change(function() {
					try {
						var year = parseInt($(this).val(), 10);
						year = (isNaN(year) ? inst.drawDate.getFullYear() : year);
						self.showMonth(elem, year, inst.drawDate.getMonth() + 1, inst.drawDate.getDate());
					}
					catch (e) {
						alert(e);
					}
				}).keydown(function(event) {
					if (event.keyCode === 13) { // Enter
						$(event.elem).change();
					}
					else if (event.keyCode === 27) { // Escape
						$(event.elem).hide().prev('select').css('visibility', 'visible');
						inst.elem.focus();
					}
				});
			// Add command behaviour
			picker.find('.' + inst.options.renderer.commandClass).click(function() {
					if (!$(this).hasClass(inst.options.renderer.disabledClass)) {
						var action = this.className.replace(
							new RegExp('^.*' + inst.options.renderer.commandClass + '-([^ ]+).*$'), '$1');
						plugin.performAction(elem, action);
					}
				});
			// Add classes
			if (inst.options.isRTL) {
				picker.addClass(inst.options.renderer.rtlClass);
			}
			if (monthsToShow[0] * monthsToShow[1] > 1) {
				picker.addClass(inst.options.renderer.multiClass);
			}
			if (inst.options.pickerClass) {
				picker.addClass(inst.options.pickerClass);
			}
			// Resize
			$('body').append(picker);
			var width = 0;
			picker.find(inst.options.renderer.monthSelector).each(function() {
				width += $(this).outerWidth();
			});
			picker.width(width / monthsToShow[0]);
			// Pre-show customisation
			if ($.isFunction(inst.options.onShow)) {
				inst.options.onShow.apply(elem, [picker, inst]);
			}
			return picker;
		},

		/** Generate the content for a single month.
			@private
			@param elem {Element} The control to affect.
			@param inst {object} The current instance settings.
			@param year {number} The year to generate.
			@param month {number} The month to generate.
			@param renderer {object} The rendering templates.
			@param first {boolean} <code>true</code> if first of multiple months.
			@return {string} The month content. */
		_generateMonth: function(elem, inst, year, month, renderer, first) {
			var daysInMonth = plugin.daysInMonth(year, month);
			var monthsToShow = inst.options.monthsToShow;
			monthsToShow = ($.isArray(monthsToShow) ? monthsToShow : [1, monthsToShow]);
			var fixedWeeks = inst.options.fixedWeeks || (monthsToShow[0] * monthsToShow[1] > 1);
			var firstDay = inst.options.firstDay;
			var leadDays = (plugin.newDate(year, month, 1).getDay() - firstDay + 7) % 7;
			var numWeeks = (fixedWeeks ? 6 : Math.ceil((leadDays + daysInMonth) / 7));
			var selectOtherMonths = inst.options.selectOtherMonths && inst.options.showOtherMonths;
			var minDate = (inst.pickingRange ? inst.selectedDates[0] : inst.get('minDate'));
			var maxDate = inst.get('maxDate');
			var showWeeks = renderer.week.indexOf('{weekOfYear}') > -1;
			var today = plugin.today();
			var drawDate = plugin.newDate(year, month, 1);
			plugin.add(drawDate, -leadDays - (fixedWeeks && (drawDate.getDay() === firstDay) ? 7 : 0), 'd');
			var ts = drawDate.getTime();
			// Generate weeks
			var weeks = '';
			for (var week = 0; week < numWeeks; week++) {
				var weekOfYear = (!showWeeks ? '' : '<span class="dp' + ts + '">' +
					($.isFunction(inst.options.calculateWeek) ? inst.options.calculateWeek(drawDate) : 0) + '</span>');
				var days = '';
				for (var day = 0; day < 7; day++) {
					var selected = false;
					if (inst.options.rangeSelect && inst.selectedDates.length > 0) {
						selected = (drawDate.getTime() >= inst.selectedDates[0] &&
							drawDate.getTime() <= inst.selectedDates[1]);
					}
					else {
						for (var i = 0; i < inst.selectedDates.length; i++) {
							if (inst.selectedDates[i].getTime() === drawDate.getTime()) {
								selected = true;
								break;
							}
						}
					}
					var dateInfo = (!$.isFunction(inst.options.onDate) ? {} :
						inst.options.onDate.apply(elem, [drawDate, drawDate.getMonth() + 1 === month]));
					var selectable = (selectOtherMonths || drawDate.getMonth() + 1 === month) &&
						this._isSelectable(elem, drawDate, dateInfo.selectable, minDate, maxDate);
					days += this._prepare(renderer.day, inst).replace(/\{day\}/g,
						(selectable ? '<a href="javascript:void(0)"' : '<span') +
						' class="dp' + ts + ' ' + (dateInfo.dateClass || '') +
						(selected && (selectOtherMonths || drawDate.getMonth() + 1 === month) ?
						' ' + renderer.selectedClass : '') +
						(selectable ? ' ' + renderer.defaultClass : '') +
						((drawDate.getDay() || 7) < 6 ? '' : ' ' + renderer.weekendClass) +
						(drawDate.getMonth() + 1 === month ? '' : ' ' + renderer.otherMonthClass) +
						(drawDate.getTime() === today.getTime() && (drawDate.getMonth() + 1) === month ?
						' ' + renderer.todayClass : '') +
						(drawDate.getTime() === inst.drawDate.getTime() && (drawDate.getMonth() + 1) === month ?
						' ' + renderer.highlightedClass : '') + '"' +
						(dateInfo.title || (inst.options.dayStatus && selectable) ? ' title="' +
						(dateInfo.title || plugin.formatDate(
						inst.options.dayStatus, drawDate, inst.getConfig())) + '"' : '') + '>' +
						(inst.options.showOtherMonths || (drawDate.getMonth() + 1) === month ?
						dateInfo.content || drawDate.getDate() : '&nbsp;') +
						(selectable ? '</a>' : '</span>'));
					plugin.add(drawDate, 1, 'd');
					ts = drawDate.getTime();
				}
				weeks += this._prepare(renderer.week, inst).replace(/\{days\}/g, days).
					replace(/\{weekOfYear\}/g, weekOfYear);
			}
			var monthHeader = this._prepare(renderer.month, inst).match(/\{monthHeader(:[^\}]+)?\}/);
			monthHeader = (monthHeader[0].length <= 13 ? 'MM yyyy' :
				monthHeader[0].substring(13, monthHeader[0].length - 1));
			monthHeader = (first ? this._generateMonthSelection(
				inst, year, month, minDate, maxDate, monthHeader, renderer) :
				plugin.formatDate(monthHeader, plugin.newDate(year, month, 1), inst.getConfig()));
			var weekHeader = this._prepare(renderer.weekHeader, inst).
				replace(/\{days\}/g, this._generateDayHeaders(inst, renderer));
			return this._prepare(renderer.month, inst).replace(/\{monthHeader(:[^\}]+)?\}/g, monthHeader).
				replace(/\{weekHeader\}/g, weekHeader).replace(/\{weeks\}/g, weeks);
		},

		/** Generate the HTML for the day headers.
			@private
			@param inst {object} The current instance settings.
			@param renderer {object} The rendering templates.
			@return {string} A week's worth of day headers. */
		_generateDayHeaders: function(inst, renderer) {
			var header = '';
			for (var day = 0; day < 7; day++) {
				var dow = (day + inst.options.firstDay) % 7;
				header += this._prepare(renderer.dayHeader, inst).replace(/\{day\}/g,
					'<span class="' + this._curDoWClass + dow + '" title="' +
					inst.options.dayNames[dow] + '">' + inst.options.dayNamesMin[dow] + '</span>');
			}
			return header;
		},

		/** Generate selection controls for month.
			@private
			@param inst {object} The current instance settings.
			@param year {number} The year to generate.
			@param month {number} The month to generate.
			@param minDate {Date} The minimum date allowed.
			@param maxDate {Date} The maximum date allowed.
			@param monthHeader {string} The month/year format.
			@return {string} The month selection content. */
		_generateMonthSelection: function(inst, year, month, minDate, maxDate, monthHeader) {
			if (!inst.options.changeMonth) {
				return plugin.formatDate(
					monthHeader, plugin.newDate(year, month, 1), inst.getConfig());
			}
			// Months
			var monthNames = inst.options['monthNames' + (monthHeader.match(/mm/i) ? '' : 'Short')];
			var html = monthHeader.replace(/m+/i, '\\x2E').replace(/y+/i, '\\x2F');
			var selector = '<select class="' + this._monthYearClass +
				'" title="' + inst.options.monthStatus + '">';
			for (var m = 1; m <= 12; m++) {
				if ((!minDate || plugin.newDate(year, m, plugin.daysInMonth(year, m)).
						getTime() >= minDate.getTime()) &&
						(!maxDate || plugin.newDate(year, m, 1).getTime() <= maxDate.getTime())) {
					selector += '<option value="' + m + '/' + year + '"' +
						(month === m ? ' selected="selected"' : '') + '>' +
						monthNames[m - 1] + '</option>';
				}
			}
			selector += '</select>';
			html = html.replace(/\\x2E/, selector);
			// Years
			var yearRange = inst.options.yearRange;
			if (yearRange === 'any') {
				selector = '<select class="' + this._monthYearClass + ' ' + this._anyYearClass +
					'" title="' + inst.options.yearStatus + '">' +
					'<option>' + year + '</option></select>' +
					'<input class="' + this._monthYearClass + ' ' + this._curMonthClass +
					month + '" value="' + year + '">';
			}
			else {
				yearRange = yearRange.split(':');
				var todayYear = plugin.today().getFullYear();
				var start = (yearRange[0].match('c[+-].*') ? year + parseInt(yearRange[0].substring(1), 10) :
					((yearRange[0].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[0], 10)));
				var end = (yearRange[1].match('c[+-].*') ? year + parseInt(yearRange[1].substring(1), 10) :
					((yearRange[1].match('[+-].*') ? todayYear : 0) + parseInt(yearRange[1], 10)));
				selector = '<select class="' + this._monthYearClass +
					'" title="' + inst.options.yearStatus + '">';
				start = plugin.add(plugin.newDate(start + 1, 1, 1), -1, 'd');
				end = plugin.newDate(end, 1, 1);
				var addYear = function(y) {
					if (y !== 0) {
						selector += '<option value="' + month + '/' + y + '"' +
							(year === y ? ' selected="selected"' : '') + '>' + y + '</option>';
					}
				};
				if (start.getTime() < end.getTime()) {
					start = (minDate && minDate.getTime() > start.getTime() ? minDate : start).getFullYear();
					end = (maxDate && maxDate.getTime() < end.getTime() ? maxDate : end).getFullYear();
					for (var y = start; y <= end; y++) {
						addYear(y);
					}
				}
				else {
					start = (maxDate && maxDate.getTime() < start.getTime() ? maxDate : start).getFullYear();
					end = (minDate && minDate.getTime() > end.getTime() ? minDate : end).getFullYear();
					for (var y = start; y >= end; y--) {
						addYear(y);
					}
				}
				selector += '</select>';
			}
			html = html.replace(/\\x2F/, selector);
			return html;
		},

		/** Prepare a render template for use.
			Exclude popup/inline sections that are not applicable.
			Localise text of the form: {l10n:name}.
			@private
			@param text {string} The text to localise.
			@param inst {object} The current instance settings.
			@return {string} The localised text. */
		_prepare: function(text, inst) {
			var replaceSection = function(type, retain) {
				while (true) {
					var start = text.indexOf('{' + type + ':start}');
					if (start === -1) {
						return;
					}
					var end = text.substring(start).indexOf('{' + type + ':end}');
					if (end > -1) {
						text = text.substring(0, start) +
							(retain ? text.substr(start + type.length + 8, end - type.length - 8) : '') +
							text.substring(start + end + type.length + 6);
					}
				}
			};
			replaceSection('inline', inst.inline);
			replaceSection('popup', !inst.inline);
			var pattern = /\{l10n:([^\}]+)\}/;
			var matches = null;
			while (matches = pattern.exec(text)) {
				text = text.replace(matches[0], inst.options[matches[1]]);
			}
			return text;
		}
	});

	var plugin = $.datepick; // Singleton instance

	$(function() {
		$(document).on('mousedown.' + pluginName, plugin._checkExternalClick).
			on('resize.' + pluginName, function() { plugin.hide(plugin.curInst); });
	});

})(jQuery);
