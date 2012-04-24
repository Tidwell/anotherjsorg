{{if start > 0}}
    <a class="back">< Prev</a>
{{/if}}
${start} - ${start + results.length} of ${count}

{{if count > start + results.length}}
    <a class="next">Next ></a>
{{/if}}
